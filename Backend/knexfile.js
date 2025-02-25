const config = {
  development: {
    client: "pg",
    connection: {
      database: "pratibimb_local",
      user: "postgres",
      password: "tanurt@123",
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
