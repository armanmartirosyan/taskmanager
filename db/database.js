import mysql from "mysql2";
import dotenv from "dotenv";

dotenv.config();

const pool = mysql.createPool({
	host: process.env.MYSQL_HOST,
	user: process.env.MYSQL_USER,
	password: process.env.MYSQL_PASS,
	database: process.env.MYSQL_DATABASE,
}).promise();
const table = process.env.MYSQL_TABLE;

export async function getTaskFromDatabase(id) {
	const [data] = await pool.query(`
	SELECT * \
	FROM ${table} \
	WHERE id = ?`, [id]);
	return data[0];
}

export default pool;