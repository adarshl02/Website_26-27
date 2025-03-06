import knex from "knex";
import knexfile from "../../knexfile.js";

const db = knex(knexfile.development);

(async () => {
  try {
    await db.raw("SELECT 1");
    console.log("Database connected successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.log("Failed to connect to the database:", error.message);
    } else {
      console.log("Failed to connect to the database. An unknown error occurred.");
    }
    process.exit(1);
  }
})();

export default db;
