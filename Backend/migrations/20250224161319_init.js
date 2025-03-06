/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex) {
  return knex.schema.createTable("attendee_documents", (table) => {
    table.increments("document_id").primary();
    table.integer("attendee_id")
      .references("attendee_id")
      .inTable("attendees")
      .onDelete("CASCADE");
    table.string("order_id").unique().notNullable();
    table.string("qr_code_link");
    table.enu("payment_status", ["PENDING", "APPROVED", "FAILED"]).defaultTo("PENDING");

    table.string("team_name")

    // Team Leader Details
    table.string("team_leader_name");
    table.string("team_leader_phone");
    table.string("team_leader_email");
    table.string("team_leader_drive_link");
    table.boolean("team_leader_attended_1").defaultTo(false);
    table.boolean("team_leader_attended_2").defaultTo(false);
    table.timestamp("team_leader_attended_1_at").nullable();
    table.timestamp("team_leader_attended_2_at").nullable();

    // Participant 2 Details
    table.string("sec_participant_name");
    table.string("sec_participant_phone");
    table.string("sec_participant_drive_link");
    table.boolean("sec_participant_attended_1").defaultTo(false);
    table.boolean("sec_participant_attended_2").defaultTo(false);
    table.timestamp("sec_participant_attended_1_at").nullable();
    table.timestamp("sec_participant_attended_2_at").nullable();

    // Participant 3 Details
    table.string("third_participant_name");
    table.string("third_participant_phone");
    table.string("third_participant_drive_link");
    table.boolean("third_participant_attended_1").defaultTo(false);
    table.boolean("third_participant_attended_2").defaultTo(false);
    table.timestamp("third_participant_attended_1_at").nullable();
    table.timestamp("third_participant_attended_2_at").nullable();

    // Participant 4 Details
    table.string("fourth_participant_name");
    table.string("fourth_participant_phone");
    table.string("fourth_participant_drive_link");
    table.boolean("fourth_participant_attended_1").defaultTo(false);
    table.boolean("fourth_participant_attended_2").defaultTo(false);
    table.timestamp("fourth_participant_attended_1_at").nullable();
    table.timestamp("fourth_participant_attended_2_at").nullable();

    // Participant 5 Details
    table.string("fifth_participant_name");
    table.string("fifth_participant_phone");
    table.string("fifth_participant_drive_link");
    table.boolean("fifth_participant_attended_1").defaultTo(false);
    table.boolean("fifth_participant_attended_2").defaultTo(false);
    table.timestamp("fifth_participant_attended_1_at").nullable();
    table.timestamp("fifth_participant_attended_2_at").nullable();

    // Participant 6 Details
    table.string("sixth_participant_name");
    table.string("sixth_participant_phone");
    table.string("sixth_participant_drive_link");
    table.boolean("sixth_participant_attended_1").defaultTo(false);
    table.boolean("sixth_participant_attended_2").defaultTo(false);
    table.timestamp("sixth_participant_attended_1_at").nullable();
    table.timestamp("sixth_participant_attended_2_at").nullable();

    // Participant 7 Details
    table.string("seventh_participant_name");
    table.string("seventh_participant_phone");
    table.string("seventh_participant_drive_link");
    table.boolean("seventh_participant_attended_1").defaultTo(false);
    table.boolean("seventh_participant_attended_2").defaultTo(false);
    table.timestamp("seventh_participant_attended_1_at").nullable();
    table.timestamp("seventh_participant_attended_2_at").nullable();

    // Participant 8 Details
    table.string("eighth_participant_name");
    table.string("eighth_participant_phone");
    table.string("eighth_participant_drive_link");
    table.boolean("eighth_participant_attended_1").defaultTo(false);
    table.boolean("eighth_participant_attended_2").defaultTo(false);
    table.timestamp("eighth_participant_attended_1_at").nullable();
    table.timestamp("eighth_participant_attended_2_at").nullable();

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
