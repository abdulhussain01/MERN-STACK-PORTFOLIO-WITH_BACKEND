import mongoose from "mongoose";




const dbConnect = async ()=>{
    
    try {
        mongoose.connect(process.env.MONGODB_URI).then(()=>{
            console.log('connected to database')
       })
        .catch((error)=>{
            console.log("Error occured while connecting to database",error)
       })

        
    } catch (error) {
        
    }
}

export default dbConnect