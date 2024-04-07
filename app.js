import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./routes/tasks.js";
import { createDirectory } from './helpers/createDirectory.js';

dotenv.config();
createDirectory();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, "./public");
const accessLogStream = fs.createWriteStream(path.join(__dirname, "logs/server.log"), {flags: "a"});
const PORT = process.env.PORT || 3000;


app.use(morgan("common", {stream: accessLogStream}));
app.use(express.static(publicDirectory));
app.use(express.json());

app.get("/hi", (req, res) => {
	res.send("Task-manager app.");
});

app.use("/api/v1/tasks/", routes);


app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});

process.on("SIGINT", () => {
	console.log("Received SIGINT signal. Gracefully shutting down...");
	process.exit(130);
});