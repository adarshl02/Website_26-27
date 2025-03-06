const config = {
  development: {
    client: "pg",
    connection: {
      database: "pratibimb_local",
      user: "postgres",
      password: "cricket@10604",
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: "knex_migrations",
    },
    seeds: {
      directory: "./seeds",
    },
  },
};

export default config;
