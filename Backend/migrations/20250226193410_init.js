
export async function up(knex) {
  return knex.schema.createTable("access_otp_log", function (table) {
    table.increments("access_otp_log_id").primary();
    table.integer("otp").notNullable();
    table.string("name");
    table.dateTime("expires_at");
    table.boolean("is_verified").defaultTo(false);
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  return knex.schema.dropTable("access_otp_log");
}
