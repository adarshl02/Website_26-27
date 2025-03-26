/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
    return knex.schema.createTable("teams", (table) => {
      table.increments("team_id").primary();
      table.string("team_name").notNullable();
      table.integer("team_size").notNullable();
  
      // Team Leader Details
      table.string("team_leader_name").notNullable();
      table.string("team_leader_email").notNullable();
      table.string("team_leader_phone").notNullable();
      table.string("team_leader_batch").notNullable();
      table.string("team_leader_branch").notNullable();
      table.string("team_leader_drive_link").nullable();
  
      // Participants' Details (No Email)
      for (let i = 2; i <= 8; i++) {
        table.string(`participant_${i}_name`).nullable();
        table.string(`participant_${i}_phone`).nullable();
        table.string(`participant_${i}_drive_link`).nullable();
      }
  
      table.timestamps(true, true);
    });
  }
  
  /**
   * @param { import("knex").Knex } knex
   * @returns { Promise<void> }
   */
  export async function down(knex) {
    return knex.schema.dropTable("teams");
  }
  