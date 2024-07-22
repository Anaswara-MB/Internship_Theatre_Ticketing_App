import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRouter from "./routes/user-routes.js";
import adminRouter from "./routes/admin-routes.js";
import movieRouter from "./routes/movie-routes.js";
import bookingsRouter from "./routes/booking-routes.js";

dotenv.config();
const app = express();

// middlewares
app.use(express.json());
app.use("/user", userRouter);
app.use("/admin",adminRouter);
app.use("/movie", movieRouter);
app.use("/booking",bookingsRouter);


mongoose
.connect(
    `mongodb+srv://anaswarambalan:${process.env.MONGODB_PASSWORD}@cluster0.ce4chht.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
)
.then(()=>
    app.listen(5000,()=>
        console.log("Connected to database and server is running")
)
)
.catch(e=>console.log(e));






