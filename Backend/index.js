import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import gracefulShutDown from "./libs/gracefulShutdown.js";
import eventsRouter from "./routes/events.routes.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.routes.js";
import artRouter from "./routes/art.routes.js";
import volunteerRouter from "./routes/volunteers.routes.js";
import adminRouter from "./routes/admin.routes.js";
import recruitmentsRouter from "./routes/recruitments.routes.js";


dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const allowedOrigins = [
  "https://website-26-27-ten.vercel.app",
  "https://www.clubpratibimb.com",
];

if (process.env.NODE_ENV === "development") {
  app.use(
    cors({
      origin: "http://localhost:5173", // Replace with your frontend URL
      credentials: true, // Allow cookies to be sent and received
    })
  );
} else {
  app.use(
    cors({
      origin: allowedOrigins,
      methods: ["GET", "POST", "PUT", "DELETE"],
      credentials: true,
    })
  );
}

app.get("/", (req, res) => {
  res.status(404).send({ message: "Not Found" });
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use("/api", eventsRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", volunteerRouter);
app.use("/api", artRouter);
app.use("/api/admin", adminRouter);
app.use("/api", recruitmentsRouter);

process.on("SIGTERM", gracefulShutDown);
process.on("SIGINT", gracefulShutDown);
process.on("SIGUSR2", gracefulShutDown);

const PORT = process.env.PORT || 3000;
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
