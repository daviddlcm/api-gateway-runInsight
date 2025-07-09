require("dotenv").config()
const express = require("express");
const fileUpload = require("express-fileupload")
const cors = require("cors");
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./src/configs/swagger.config');

const app = express();

// app.use(fileUpload({
//     useTempFiles: true,
//     tempFileDir: './temp',
// }))
app.use(cors())
app.use(express.urlencoded({extended:false}))

const PORT = process.env.PORT || 3000;

const userRoutes = require("./src/routes/user.routes")
const trainingRoutes = require("./src/routes/training.routes")

app.use(express.json());


app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/users",userRoutes)
app.use("/trainings", trainingRoutes)


app.get('/health', (req, res) => {
  res.status(200).send('OK');
});


app.listen(PORT,() => {
    console.log(`Server is running on port ${PORT}`);
})