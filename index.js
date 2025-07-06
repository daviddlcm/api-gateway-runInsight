require("dotenv").config()
const express = require("express");
const fileUpload = require("express-fileupload")
const cors = require("cors");

const app = express();

// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: './temp',
// }))
app.use(cors())
app.use(express.urlencoded({extended:false}))

const PORT = process.env.PORT || 3000;

const userRoutes = require("./src/routes/user.routes")

app.use(express.json());

app.use("/users",userRoutes)

app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})