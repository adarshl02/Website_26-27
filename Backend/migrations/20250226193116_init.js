/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable("active_admins",(table)=>{
        table.increments('id').primary()
        table.string('name')
        table.string("email").defaultTo("teampratibimb@admin.com")
        table
          .string("avatar")
          .defaultTo(
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
          );
        table.string("batch").defaultTo("2025");
        table.string("branch").defaultTo("Admin");
        table.boolean("is_member").defaultTo(true);
        table.boolean("is_artist").defaultTo(true);

        table.timestamps(true,true)

    })
  
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex) {
    return knex.schema.dropTable("active_admins")
  
};
