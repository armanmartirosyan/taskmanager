import path from "node:path";
import fs from "node:fs";

const colors = {
	reset: "\x1b[0m",
	red: "\x1b[31m",
	green: "\x1b[32m",
	yellow: "\x1b[33m",
	blue: "\x1b[34m",
	magenta: "\x1b[35m",
	cyan: "\x1b[36m",
};

export function sendError(res, error) {
	res.status(error.status || 500)
	res.send({
		error: {
			status: error.status || 500,
			message: error.message,
		},
	});
}

export function createErrorLogFile() {
	const filePath = path.join('logs','error.log');
	if (!fs.existsSync(filePath)) {
		fs.writeFileSync(filePath, '');
	}
}

export function errorHandler(err, req, res) {
	console.log(`${colors.red}Error: Connection issue. Check './logs/error.log' for details.${colors.reset}`);
	fs.appendFile('./logs/error.log', `${new Date().toISOString()}: ${err.stack}\n\n`, (error) => {
		if (error)
			console.error('Error logging to error.log:', error);
	});
	err.status = 503;
	err.message = "Connection issue.";
	sendError(res, err);
}