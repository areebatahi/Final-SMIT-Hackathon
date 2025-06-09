import express from "express";
import userRoutes from "./routes/userRoutes.mjs";
import taskRoutes from "./routes/taskRoutes.mjs";
import cors from "cors";
import connectToDB from "./db/dataBase.mjs";

// Connect to MongoDB
connectToDB();

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: [
      "http://localhost:5174",
      "http://localhost:5173",
      "https://final-smit-hackathon-ks94.vercel.app",
      /\.vercel\.app$/,
      // /\.up\.railway\.app$/,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("API is running 🚀");
});

// ✅ Handle Preflight Requests Globally
app.options("*", (req, res) => {
  res.sendStatus(200);
});

// ✅ Log All Requests (Optional Debugging)
app.use((req, res, next) => {
  console.log("Request URL:", req.url, "Method:", req.method);
  next();
});

// ✅ API Routes
app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);

// ✅ Start Server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
