const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const eventsRouter = require("./routes/events.routes.js");
const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");
const volunteerRouter = require("./routes/volunteers.routes.js");

dotenv.config();

const app = express();

const allowedOrigins = [
  'https://website-26-27-ten.vercel.app',
  'https://www.clubpratibimb.com',
];

if (process.env.NODE_ENV === 'development'){
  app.use(cors());
} else {
  app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
  }));
}


app.use(express.json());

app.get('/', (req, res) => {
  res.status(404).send({ message: "Not Found" });
});

// Handle favicon.ico requests
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.use("/api",eventsRouter);
app.use("/api",authRouter);
app.use("/api",userRouter);
app.use("/api", volunteerRouter);


app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  const success = false;
  return res.status(statusCode).json({
    success,
    statusCode,
    message,
  });
});
