/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
  return knex.schema.createTable("volunteers", (table) => {
    table.increments("volunteer_id").primary();
    table.string("name")
    table.string("email")
  

    table.string("phone")
    table
      .enum("domain", [
        "Photography",
        "Arts",
        "Web Development",
        "Content Creation",
        "Event Management",
        "Graphics Designer",
      ])
      
    table.string("branch")
    table.integer("batch")
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTable("volunteers");
};
