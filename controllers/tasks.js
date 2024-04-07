import { getTaskFromDatabase } from "../db/database.js";

export function getAllTasks(req, res) {
	res.send("get all tasks");
}

export async function getTask(req, res) {
	const task = await getTaskFromDatabase(req.params.id);
	res.send({task});
}

export function createTask(req, res) {
	res.json(req.body);
}

export function updateTask(req, res) {
	res.send("update tasks");
}

export function deleteTask(req, res) {
	res.send("delete task");
}