/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function (knex) {
    return knex.schema.createTable("volunteers", (table) => {
        table.increments("volunteer_id").primary();
        table.string('email').notNullable()
        table.string('phone').notNullable()
        table.string("enrollment").notNullable().unique();
        table.string('branch').notNullable()
        table.integer('batch').notNullable()

    })
  
      
    
  };
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  exports.down = function (knex) {
    return knex.schema.dropTable('volunteers')
      
  };
  