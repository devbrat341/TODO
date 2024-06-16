const  userModel  =  require("../models/user.model.js");
const bcrypt = require("bcrypt");
const  { createToken } = require("../utils/generateToken.js");


const registerUser = async (request, response) => {
  let { username, email, password } = request.body;
  try {

    if (!username || !email || !password) {
      return response
        .status(400)
        .json({ message: "All fields are required" });
    }
    // Checking Existing User
    const isUserExist = await userModel.findOne({ email });
    if (isUserExist) {
      return response.status(400).json({ message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      username,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = await createToken(user._id);

    response.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    // console.log("User registered successfully", user);

    const responseUser = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    response.status(201).json({
      user: responseUser,
      message: "User registered successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.log("Error while registering user: ", error);
    response.status(500).json({ message: error.message });
  }
};

const loginUser = async (request, response) => {
  let { email, password } = request.body;
  try {
    if (!email || !password) {
      return response
        .status(400)
        .json({ message: "All fields are required" });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return response
        .status(400)
        .json({ message: "No user found with provided email." });
    }

    // checking password
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return response.status(400).json({
        message: "Oops ! Please check you password it seems incorrect...",
      });
    }
    
    const token = createToken(user._id);

    response.cookie("token", token, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    const responseUser = {
      id: user._id,
      username: user.username,
      email: user.email,
    };

    response.status(200).json({
      user: responseUser,
      message: "User logged in successfully",
      success: true,
      token,
    });
  } catch (error) {
    console.log("Error while logging in: ", error);
    response.status(500).json({ message: error.message });
  }
};

const getUserProfile = async (request, response) => {
  try {
    const id = request.user.id;
    const user = await userModel.findById(id).select("-password");
    response.status(200).json({
      user,
      message: "User profile fetched successfully.",
      success: true,
      token: request.token,
    });
  } catch (error) {
    console.log("Error while fetching user profile: ", error);
    response.status(500).json({ message: error.message });
  }
};


module.exports =  {
    registerUser,
    loginUser,
    getUserProfile
}