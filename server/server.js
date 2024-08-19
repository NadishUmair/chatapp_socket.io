const express=require('express');
const cors = require('cors');
require('dotenv').config();
const ConnectDB = require('./config/connDb');
const port=5000;
const app=express();
app.use(cors());
const userRoutes=require("./Routes/userRoutes");
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(express.json());
ConnectDB();
app.use("/api/user",userRoutes)

app.use(notFound);
app.use(errorHandler)
app.listen(port,()=>{
    console.log("app is running at port",port);
})


