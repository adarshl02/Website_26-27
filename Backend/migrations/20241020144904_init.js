/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("volunteers", (table) => {
    table.increments("volunteer_id").primary();
    table.string("name");
    table.string("email")
    table.string("phone")
    table.string("domain");
    table.string("branch");
    table.string("batch");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
  return knex.schema.dropTable("volunteers");
};
