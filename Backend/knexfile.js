import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

export default {
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
