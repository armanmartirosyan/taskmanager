import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const result = dotenv.config({ path: path.resolve(__dirname, '../.env') });

export default {
  development: {
	client: 'mysql2',
	connection: {
	  host: process.env.MYSQL_HOST || 'localhost',
	  user: process.env.MYSQL_USER || 'root',
	  password: process.env.MYSQL_PASS || 'root',
	  database: process.env.MYSQL_DATABASE || 'taskmanager',
	},
	migrations: {
	  directory: path.join(__dirname, '..', 'config', 'db', 'migrations'),
	},
	seeds: {
	  directory: path.join(__dirname, '..', 'config', 'db', 'seeds'),
	},
  },
};
