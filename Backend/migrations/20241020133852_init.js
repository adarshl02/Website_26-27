exports.up = function (knex) {
    return knex.schema.createTable("attendees", (table) => {
      table.increments("attendee_id").primary();
      table.integer("event_id").notNullable();
      table.foreign("event_id").references("event_id").inTable("events");
      table.string("team_name").notNullable();
      table.integer("team_size").notNullable();
      table.string("team_leader_name").notNullable();
      table.string("team_leader_phone").notNullable();
      table.string("team_leader_email").notNullable();
      table.string("team_leader_batch").notNullable();
      table.string("team_leader_branch").notNullable();
      table.string("sec_participant").notNullable();
      table.string("third_participant").notNullable();
      table.string("fourth_participant").notNullable();
      table.string("fifth_participant").notNullable();
      table.string("sixth_participant").notNullable();
      table.string("seventh_participant").notNullable();
      table.string("eight_participant").notNullable();
      table.string("order_id");
      table.enum("payment_status", ["PENDING", "APPROVED"]);
      table.text("qr_code");
      table.boolean("is_attended").defaultTo(false);
      table.timestamps(true, true);
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable("attendees");
  };
  