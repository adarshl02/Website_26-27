import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();


export default {
  development: {
    client: "pg",
    connection: {
      user: process.env.USER,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: 21137,
      database: process.env.DATABASE,
      ssl: {
        rejectUnauthorized: process.env.REJECTUNAUTHORIZED === "true",
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUL1h4g12ph1bFMFbnLcorMKvqc2wwDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvMTM3YTg0MDMtMDA3Mi00NmY5LTg2NzgtZTllYWJjMjRk
MzE5IFByb2plY3QgQ0EwHhcNMjQxMjEwMTI0MzU2WhcNMzQxMjA4MTI0MzU2WjA6
MTgwNgYDVQQDDC8xMzdhODQwMy0wMDcyLTQ2ZjktODY3OC1lOWVhYmMyNGQzMTkg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAOH1eY9E
YacjLAXs9pzHePYpAniYVk7Fg+YIU5c7oM26I4qOH7GGFo6eb4Sc2RtX0OymU8Gn
mg3I/n85wFXM9VPh9hpd53zT1U1gG4NduxTtoRx7EcWv+MWk0D2uSDw62ViTaLn6
NlidpYZqppUpVjZhx2m7Mjdnim9LTfk3VE2COhNBSggy3WKcuk3o3AlhqxC1QsgU
ExPiY8G01frypF2zgOLYerGTwo443hJbpbT7WfsxIv+70rFtdYsBEw8cYropIpdB
IrgqKBKSy26xmL4pbRMj0JuM/odJJihkkCNHEqoYRR3kEnxUoKfG2bYz6axt8CFF
IC13bjzYTSqNz6/hlmGN+qucBn89X77jnqTQqr5yY+5a8tdQSb+IhdMFJousRapf
HHbSSOKuOWX7JTic6TPqF/uIcS/gKbqH8MBTJySZi/tEDJo23GE9zCoO94zGBqrS
q8gM3sUuEwHatp8p/EXWcz8Ci3R2xBqJLTy2taErsXYVtlFg22hZID758QIDAQAB
oz8wPTAdBgNVHQ4EFgQUz9ZX49Xh2e7Hh9YT2GTjzJ/fE8IwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAKj6u1IqhztMBIMt
Qm8vWmPzhvWF26LWVXmfeEyp/oWdCuv8SmQ7QkjB20fJVLTWB7FsH362Is8O1FJ0
nQtJi8xg91D5Xb9f/f7DdOrdhRqeuqEqEWAthOfiWoq3NVYNX6S24l6cOTylaJVq
CeOcxFme4q6olc3l0sLbogX11EV2GVd7ZUPoeoYYJ6Wu1AeDqeEG3x7lzTpnjBJz
mVoqmgeq/0xQDulzm5yBdge0+OKSmnLB22vNhbsKw/V+3LyB6MijgNZgb3Y1tYhZ
ZuohsMXI4v/Va3NI5YrapQj8JTLGEW2HiQb4IuTXzrErdj1vSoizGcXDeHvn4v3M
59Dg4xFEaV5OZiafBOmHDy54/txCv9ZqFEC5bJEiS5xt1tGCzDvKCbS9DcE0Q/nM
mVtUm2JC7To9Ri93e4RTU3nFjGz6v5wG768Bx5nbi6kwolwYE244Fpd5iefZs6hd
JEymGwxVOupIGTcxGegY9qPUwAUfnQDA+2X9pKkp4QVVM4eFnA==
-----END CERTIFICATE-----
        `,
      },
    },
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
  },
};


// module.exports = {
//   development: {
//     client: "pg",
//     connection: {
//       database: "pratibimb_local",
//       user: "postgres",
//       password: "tanurt@123",
//     },
//     pool: {
//       min: 2,
//       max: 10,
//     },
//     migrations: {
//       tableName: "knex_migrations",
//     },
//     seeds: {
//       directory: "./seeds",
//     },
//   },
// };
