const express=require('express')
const cors=require('cors')
const bodyparser=require('body-parser')
const connectDatabase=require("../db/database")
const app=express()

//Router
const userRouter=require("../router/userRoute")
require("dotenv").config()

//Middleware
app.use(cors())
app.use(bodyparser.json())


//Routes
app.use("/api",userRouter)
//database connection
connectDatabase()

app.listen(process.env.PORT,()=>{
    console.log(`listening port ${process.env.PORT}`)
})
