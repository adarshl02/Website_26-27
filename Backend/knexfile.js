// knexfile.js
const fs = require("fs");
const path = require("path");
require('dotenv').config()

module.exports = {
  development: {
    client: "pg",
    connection: {
      user: process.env.USER,
      password: process.env.PASSWORD,
      host: process.env.HOST,
      port: process.env.PORT,
      database: process.env.DATABASE,
      ssl: {
        rejectUnauthorized: process.env.REJECTUNAUTHORIZED,
        ca: `-----BEGIN CERTIFICATE-----
MIIEQTCCAqmgAwIBAgIUGEQ9/3gw2gFbPTByLNIU7F2heW0wDQYJKoZIhvcNAQEM
BQAwOjE4MDYGA1UEAwwvYmI1ZmNiMzAtNWUyYS00ZDkyLTgzMjEtNDQ0MzRjNjY5
YzFjIFByb2plY3QgQ0EwHhcNMjQxMDI2MTU1MzQyWhcNMzQxMDI0MTU1MzQyWjA6
MTgwNgYDVQQDDC9iYjVmY2IzMC01ZTJhLTRkOTItODMyMS00NDQzNGM2NjljMWMg
UHJvamVjdCBDQTCCAaIwDQYJKoZIhvcNAQEBBQADggGPADCCAYoCggGBAKEAzUyW
AZ1BJf1IAyXR9H84ZnhKSd+EzmgucyNrJTji8FqCyp0ySeaMK7APHmJxJhCh9QCl
nZsQaVLNoPdr477U4rdBk5bphogf6YkVdXSJLQD0cOunjCAfBpc8O5kSjHJHk1g+
oddSyZRXfBlqKIOKOyjbAAHzOk3LDWTC1Eba+kZgG/rKYUBTQNFHv+I/pkN7/DsK
Ud9bapR2OjZ4ira9JiCjNaNYlFgHtJiDmMEvxAp4PH8dQI4mEhtKvYlf1nOwZm6D
/H/CIzbtLlCdD48Pgtt5yNqN5eOoBaB2xteIULtYKnYqRpykVocZ/rmeX3Ma7hMc
WHHme/m/MTCwJoUg6RqZ4pwIYUb9xSDDKtyr7wMoAUgqJwiSnRVQrmEeSbKZAzlo
OKNa4pJOYftkKnMTudEy/ExWmmnex0a/RGNHcvaVOOiHSxvTLG4iYIIgJMmApKoA
ioVTJd8rZCYPIz4QgJ3DfuFMN+8sLzsvAGFrjwjwXLDVQVwlpBntgG8t1QIDAQAB
oz8wPTAdBgNVHQ4EFgQU1Mti7OMuRSRA2gT9zYNx/1WuSgwwDwYDVR0TBAgwBgEB
/wIBADALBgNVHQ8EBAMCAQYwDQYJKoZIhvcNAQEMBQADggGBAB56VoFSLwmBoxg0
ykoNuF9C5WdGolcuZ9h9V7v8o3bYaOprIT5vWF7ly1J2wbKxRQZ51+LYReEO4g2e
l5+w8GmO2chjoYuWTClRbr0A91THbAv67zYx53+YiMr7mML2df36yayqynv5XLXu
ZT3P7rBJ/Vq0ghYwh+5osOMHFpKIUJTuYczhCydRhMpfXE5SI+HOY/hqui3SPCPw
/jQjUogqNs6b0O82ShcMgf0vqw/tsySNI0QEg/gXYKgMAbKE9b9ESnD3pKtYMwD+
W/RfMVnUFN/OWItW1qJ733Tu3sZMnb0VcKtFtYXmJ2NZiFy4kqMx2r7mjBwu0dDf
wdh8RjsO6I6XLKHYpmMFCSonf39Cc1I2sYlir28bvc/1/uKHq53C9oYzBKSBrQ1A
NC/7vzEvC54xnj3PLy0WnsXxwMkoKznBYy9ABcDqdmVr3FELb2Yi0V9rQfn1t5um
aryqDU6Ir1ave3llNxpaM3olFDdwrD4iF4g/E1xc7AsXXO80KA==
-----END CERTIFICATE-----
`,
      },
    },
    migrations: { directory: "./migrations" },
    seeds: { directory: "./seeds" },
  },
};
