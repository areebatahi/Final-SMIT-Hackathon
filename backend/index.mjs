import express from "express";
import userRoutes from "./routes/userRoutes.mjs"
import cors from "cors";
import connectToDB from "./db/dataBase.mjs";

//Connecting MongoDB
connectToDB()
const app = express();

app.use(
	cors({
		origin: ['http://localhost:5174', 'http://localhost:5173',"https://final-smit-hackathon-qc45qkl2w-areeba-tahirs-projects.vercel.app"],
		methods: ['GET', 'PUT', 'POST', 'DELETE'],
		credentials: true,
		allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);


app.use(express.json());
const port = process.env.PORT || 5000;

app.use("/api/auth",userRoutes)

app.use("/", (req, res, next) => {
  console.log("Request URL:", req.url, "method: ", req.method);
  next();
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
