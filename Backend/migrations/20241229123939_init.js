exports.up = function (knex) {
    return knex.schema.table("users", (table) => {
      table.enum("ROLE",['USER','ADMIN'])
    });
  };
  
exports.down = function (knex) {
    return knex.schema.table("users", (table) => {
        table.enum("ROLE",['USER','ADMIN'])
    });
  };
  