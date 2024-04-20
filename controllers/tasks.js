import knex from "knex";
import knexConfig from "../config/knexfile.js"
import { sendError, errorHandler } from "../helpers/errorHandler.js"

export const db = knex(knexConfig.development);

export async function getAllTasks(req, res) {
	try {
		const tasks = await db("tasks").select("*");
		res.status(200).json({tasks});
	} catch (error) {
		errorHandler(error, req, res);
	}
}

export async function getTask(req, res) {
	try {
		const task = await db("tasks").where({ id: req.params.id }).first();
		if (!task)
			return res.status(404).json({ message: "Task not found" });
		res.status(200).json({ task });
	} catch (error) {
		errorHandler(error, req, res);
	}
}

export async function createTask(req, res) {
	try {
		const name = req.body?.name?.trim();

		if (!name || /^\s*$/.test(name)) {
		  throw new TypeError("Task name required.");
		}
		const task = await db("tasks").insert(req.body);
		res.status(201).json({ "id": task[0] });
	} catch (error) {
		if (error instanceof TypeError) { 
			error.status = 406;
			sendError(res, error);
		}
		else 
			errorHandler(error, req, res);
	}
}

export async function updateTask(req, res) {
	try {
		const name = req.body?.name?.trim();

		if (!name || /^\s*$/.test(name)) {
		  throw new TypeError("Task name required.");
		}
		if (!req.body.hasOwnProperty('completed'))
			throw TypeError("Task status required.");
		const updatedCount = await db("tasks").where({ id: req.params.id }).update(req.body);
		if (updatedCount === 0) {
			return res.status(404).json({ error: 'Task not found' });
		}
		const task = await db("tasks").where({ id: req.params.id }).first();
		if (!task)
			return res.status(404).json({ message: "Task not found" });
		res.status(200).json({ task });
	} catch (error) {
		if (error instanceof TypeError) { 
			error.status = 406;
			sendError(res, error);
		}
		else 
			errorHandler(error, req, res);
	}
}

export async function deleteTask(req, res) {
	try {
		const deletedTaskCount = await db("tasks").where({ id: req.params.id}).del();
		if (deletedTaskCount === 0) {
			return res.status(404).json({ message: "Task not found" });
		}
		res.json({ message: "Task deleted successfully" });
	} catch (error) {
		errorHandler(error, req, res);
	}
}