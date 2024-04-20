import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import routes from "./routes/tasks.js";
import { db } from "./controllers/tasks.js";
import { createDirectory } from './helpers/createDirectory.js';
import { createErrorLogFile } from "./helpers/errorHandler.js";

dotenv.config();
createDirectory();
createErrorLogFile();

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDirectory = path.join(__dirname, "./public");
const accessLogStream = fs.createWriteStream(path.join(__dirname, "logs/server.log"), {flags: "a"});
const PORT = process.env.PORT || 3000;


app.use(morgan("common", {stream: accessLogStream}));
app.use(express.static(publicDirectory));
app.use(express.json());

app.use("/api/v1/tasks/", routes);


app.listen(PORT, () => {
	console.log(`Server is listening on port ${PORT}...`);
});

process.on("SIGINT", () => {
	db.destroy()
	.then(() => {
		console.log('Database connection closed successfully.');
		console.log("Received SIGINT signal. Gracefully shutting down...");
		process.exit(0);
	})
	.catch((error) => {
		console.error('Error closing database connection:', error);
		process.exit(1);
	});
});