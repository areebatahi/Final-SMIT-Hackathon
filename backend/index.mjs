import express from "express";
import userRoutes from "./routes/userRoutes.mjs";
import taskRoutes from "./routes/taskRoutes.mjs"
import cors from "cors";
import connectToDB from "./db/dataBase.mjs";

//Connecting MongoDB
connectToDB()
const app = express();

app.use(
	cors({
		origin: [
			'http://localhost:5174',
			'http://localhost:5173',
			"https://final-smit-hackathon-ks94-4emtviy89-areeba-tahirs-projects.vercel.app",
			"https://final-smit-hackathon-ks94.vercel.app",
			/\.vercel\.app$/, // Wildcard for all Vercel subdomains
			/\.up\.railway\.app$/, // Wildcard for all Railway subdomains
			],
			methods: ['GET', 'PUT', 'POST', 'DELETE'],
			credentials: true,
			allowedHeaders: ['Content-Type', 'Authorization'],
	}),
);


app.use(express.json());
const port = process.env.PORT || 5000;

app.use("/api/auth", userRoutes);
app.use("/api/tasks", taskRoutes);


app.use("/", (req, res, next) => {
	console.log("Request URL:", req.url, "method: ", req.method);
	next();
});

app.listen(port, () => {
	console.log(`Example app listening on port ${port}`);
});
