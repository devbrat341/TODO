// const jwt = require("jsonwebtoken");

// export const authUser = async (request, response, next) => {
//   const { authorization } = request.headers;

//   if (!authorization) {
//     return response
//       .status(401)
//       .json({ message: "Unauthorized access, Please Login !" });
//   }

//   const token = authorization.split(" ")[1];
//   // console.log("TOKEN: ", token);

//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     // console.log("DECODED TOKEN: ", decoded);
//     request.user = decoded;
//     request.token = token;
//     next();
//   } catch (error) {
//     console.log("Error while verifying token: ", error);
//     return response.status(401).json({ message: "Unauthorized access" });
//   }
// };



const User = require("../models/user.model");
const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  // console.log(req?.headers)
    let token;
    if (req?.headers?.authorization?.startsWith("Bearer")) {
        token = req.headers.authorization.split(" ")[1];
        try {
        if (token) {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            const user = await User.findById(decode?.id);
            req.user = user;
            req.token = token
            next();
        }
        } catch (error) {
            console.log("Error while verifying token: ", error);
            return response.status(401).json({ message: "Unauthorized access" });
        }
    } else {
        return response
            .status(401)
            .json({ message: "Unauthorized access, Please Login !" });
  }
};


module.exports = {
    authUser
};