const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const eventsRouter = require("./routes/events.routes.js");
const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");
const artRouter = require("./routes/art.routes.js");
const volunteerRouter = require("./routes/volunteers.routes.js");

dotenv.config();

const app = express();
app.use(cookieParser());

const allowedOrigins = [
  'https://website-26-27-ten.vercel.app',
  'https://www.clubpratibimb.com',
];

if (process.env.NODE_ENV === 'development'){
  app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true // Allow cookies to be sent and received
  }));
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
app.use("/api", artRouter);


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
