import dotenv from "dotenv";
dotenv.config(); // Move this to the top of the file

import express from "express";
import { connectDB } from "./config/db.js"; // Import this AFTER config
import todoRouter from "./routes/todo.routes.js"

const app = express();

app.use(express.json());
app.use("/api/todos", todoRouter);

const __dirname = path.resolve();

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname, "client/dist")));
    app.get("*", (req,res) => {
        res.sendFile(path.resolve(__dirname,"client", "dist", "index.html"));
    })
}

app.listen(5000, () => {
    connectDB();
    console.log("listening") })