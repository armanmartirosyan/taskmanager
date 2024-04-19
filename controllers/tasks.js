import knex from "knex";
import knexConfig from "../config/knexfile.js"
import { sendError } from '../helpers/errorHandler.js'

const db = knex(knexConfig.development);

export function getAllTasks(req, res) {
	res.send("get all tasks");
}

export async function getTask(req, res) {
	try {
		const task = await db('tasks').where({ id: req.params.id }).first();
		if (!task)
			return res.status(404).json({ error: 'User not found' });
		res.send(task);
	} catch (error) {
		error.status = 503;
		error.message = "Connection issue.";
		sendError(res, error);
	}
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