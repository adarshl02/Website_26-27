// migrations/20240101010101_create_users_table.js (the timestamp will vary)

exports.up = function (knex) {
  return knex.schema.createTable("users", (table) => {
    table.increments("id").primary(); // Primary key
    table.string("name").notNullable();
    table.string("email").notNullable();
    table
      .string("avatar")
      .defaultTo(
        "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
      ); // Avatar field
    table.string("batch").notNullable();
    table.string("branch").notNullable();
    table.string("enrollment").notNullable();
    table.boolean("is_member").defaultTo(false);
    table.timestamps(true, true); // Created at and updated at timestamps
  });
}

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users"); // Drop users table if it exists
}
