/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function up(knex) {
	return knex.schema.createTable('tasks', function(table) {
		table.increments('id').primary();
		table.string('name', 255).notNullable();
		table.boolean('completed').defaultTo(false);
	  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export function down(knex) {
	return knex.schema.dropTable('tasks');
}
