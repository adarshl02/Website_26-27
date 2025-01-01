/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("admins",(table)=>{
        table.increments('id').primary()
        table.string('username').notNullable().unique()
        table.string('password').notNullable()
        table.string("name").notNullable();
        table.string("email").notNullable().unique();
        table
          .string("avatar")
          .defaultTo(
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          ); // Avatar field
        table.string("batch").notNullable();
        table.string("branch").notNullable();
        table.boolean("is_member").defaultTo(false);
        table.boolean("is_artist").defaultTo(false);
        table.timestamps(true, true);
    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTable('admins')
  
};
