// knexfile.js
const fs = require("fs");
const path = require("path");
require('dotenv').config()

module.exports = {
  development: {
    client: "pg",
    connection: {
      database: process.env.DATABASE,
      user:process.env.USER,
      password:process.env.PASSWORD
      },
    },
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
  }
