const express = require("express")
require("dotenv").config()
const cors = require("cors")
const DB = require("./config/db")
const setRout = require("./routes/index")
const morgan = require("morgan")


const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())
app.use(cors())
DB()
app.use(morgan("dev"));
setRout(app)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
