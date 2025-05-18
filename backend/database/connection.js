import mongoose from "mongoose";

export const connection = () => {
    mongoose.connect(process.env.MONGO_URI,{
        dbName: "auctions"
    }).then(() => {
        console.log("Connected to database");
    }).catch(err=>{
        console.log(`Some error occured while connecting to databse: ${err}`)
    })
    mongoose.set("strictQuery", false);
}