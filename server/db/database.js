const moongose=require("mongoose")

require("dotenv").config()
const connectDatabase=async()=>{
    try{
        moongose.connect(`${process.env.MONGOOSE_CONNECT}`,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
          
        })
        console.log("database connection")
    }catch(err){
         console.log("there is error",err)
    }
}

module.exports=connectDatabase