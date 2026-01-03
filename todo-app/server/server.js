import dotenv from "dotenv";
dotenv.config(); // Move this to the top of the file

import express from "express";
import { connectDB } from "./config/db.js"; // Import this AFTER config
import todoRouter from "./routes/todo.routes.js"

const app = express();

app.use("/api/todos", todoRouter);

app.get("/", (req,res) => {
    res.send("This is the main page");
    res.end;
}) 


app.listen(5000, () => {
    connectDB();
    console.log("listening") })