// knexfile.js
const fs = require("fs");
const path = require("path");

module.exports = {
  development: {
    client: "pg",
    connection: {
      connectionString:
        "postgres://avnadmin:AVNS_W7_pUDaFaXe0881gZX9@pg-10d412e9-eklavyasinghparihar-c8f8.c.aivencloud.com:24973/defaultdb?sslmode=require",
      ssl: {
        rejectUnauthorized: true,
        ca: fs
          .readFileSync(path.join("C:/Users/Eklavya Singh/Desktop/ca.pem"))
          .toString(),
      },
    },
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
  },
};
