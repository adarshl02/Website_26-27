/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("attendee_documents", (table) => {
    table.increments("document_id").primary();
    table.integer("attendee_id")
    table
      .foreign("attendee_id")
      .references("attendee_id")
      .inTable("attendees")
      .onDelete("CASCADE");
    table.string("order_id").unique().notNullable();
    table.string("qr_code_link")
    table
      .enu("payment_status", ["PENDING", "APPROVED", "FAILED"])
      .defaultTo("PENDING");

    // Team Leader Details
    table.string("team_leader_name")
    table.string("team_leader_phone")
    table.string("team_leader_email")
    table.string("team_leader_drive_link")
    table.boolean("team_leader_attended").defaultTo(false);

    // Other Participants (Up to 8)
    table.string("sec_participant_name");
    table.string("sec_participant_phone");
    table.string("sec_participant_drive_link");
    table.boolean("sec_participant_attended").defaultTo(false);

    table.string("third_participant_name");
    table.string("third_participant_phone");
    table.string("third_participant_drive_link");
    table.boolean("third_participant_attended").defaultTo(false);

    table.string("fourth_participant_name");
    table.string("fourth_participant_phone");
    table.string("fourth_participant_drive_link");
    table.boolean("fourth_participant_attended").defaultTo(false);

    table.string("fifth_participant_name");
    table.string("fifth_participant_phone");
    table.string("fifth_participant_drive_link");
    table.boolean("fifth_participant_attended").defaultTo(false);

    table.string("sixth_participant_name");
    table.string("sixth_participant_phone");
    table.string("sixth_participant_drive_link");
    table.boolean("sixth_participant_attended").defaultTo(false);

    table.string("seventh_participant_name");
    table.string("seventh_participant_phone");
    table.string("seventh_participant_drive_link");
    table.boolean("seventh_participant_attended").defaultTo(false);

    table.string("eighth_participant_name");
    table.string("eighth_participant_phone");
    table.string("eighth_participant_drive_link");
    table.boolean("eighth_participant_attended").defaultTo(false);

    table.timestamps(true, true);
  });
}

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

export async function down(knex) {
  return knex.schema.dropTable("attendee_documents");
}
