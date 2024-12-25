exports.up = function (knex) {
    return knex.schema.createTable("art_community", (table) => {
      table.increments("id").primary();
      table.string("name").notNullable();
      table.string("email").notNullable();
      table.string("phone").notNullable();
      table.string("image_url").notNullable();
      table.string("instagram_user_id").notNullable();
      table.text('description').notNullable()
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTableIfExists("art_community");
  };
  