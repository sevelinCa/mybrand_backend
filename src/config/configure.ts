import mongoose from "mongoose";


const DB: any = process.env.DATABASE;

mongoose.connect(DB, {})
.then(() => {
    console.log("Database connected");
})
.catch((error: any) => {
    console.error("Database connection error:", error.message);
});
