import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./database/db.js";
import taskRoutes from "./routes/task.routes.js";

dotenv.config();

const PORT = process.env.PORT || 5000;
const app = express();

connectDB();

app.use(cors());
app.use(express.json());

app.use("/", taskRoutes);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
