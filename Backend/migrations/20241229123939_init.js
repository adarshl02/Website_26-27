exports.up = function (knex) {
    return knex.schema.table("users", (table) => {
      table.enum("ROLE",['USERS,ADMIN']).defaultTo('USERS')
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.table("users", (table) => {
        table.enum("ROLE",['USERS,ADMIN']).defaultTo('USERS')
    });
  };
  