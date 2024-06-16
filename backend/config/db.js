const mongoose = require('mongoose')

const connectDB = async () => {
    try{
        const conn = mongoose.connect(process.env.MONGO_URI)
        console.log(`DB connected successfully`);
    }catch(err){
        console.log(err)

    }
}

module.exports = connectDB