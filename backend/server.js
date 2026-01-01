import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from "./database/db.js";
import taskRoutes from "./routes/task.routes.js";

const PORT = process.env.PORT || 5000;
dotenv.config();
const app = express();

connectDB();

app.use(cors())
app.use(express.json());

app.use("/tasks", taskRoutes);

app.get("/", (req, res) => {
    console.log("api is running");
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
