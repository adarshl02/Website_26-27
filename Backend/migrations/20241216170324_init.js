export async function up(knex) {
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
  
  export async function down(knex) {
    return knex.schema.dropTableIfExists("art_community");
  };
  