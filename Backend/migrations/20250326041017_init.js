/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable("applicants", (table) => {
      table.increments("volunteer_id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("phone").notNullable();
      table.string("domain").notNullable();
      table.string("branch").notNullable();
      table.string("batch").notNullable();
      table.string("experience").notNullable();
      table.string("otherClubMembership").notNullable();
      table.string("order_id").notNullable();
      table.enu("payment_status", ["PENDING", "APPROVED"]).notNullable();
      table.timestamps(true, true);
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.dropTable("applicants");
  }
  