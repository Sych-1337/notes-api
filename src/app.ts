import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import noteRoutes from "./routes/noteRoutes";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);


app.get("/", (req, res) => {
  res.send("Server is running!");
});

export default app;
