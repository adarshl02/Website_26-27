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
  "capacitor://localhost", // Required for Android
  "http://localhost"       // Required for iOS
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (mobile apps, Postman, etc.)
    if (!origin) return callback(null, true);
    
    if (
      process.env.NODE_ENV === "development" || 
      allowedOrigins.includes(origin) ||
      origin.includes("//localhost:") // For local dev
    ) {
      return callback(null, true);
    }
    callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
}));

app.get("/", (req, res) => {
  res.status(404).send({ message: "Healthy " });
});

app.get("/favicon.ico", (req, res) => res.status(204).end());

app.use("/api", eventsRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", volunteerRouter);
app.use("/api", recruitmentsRouter);
app.use("/api", artRouter);
app.use("/api/admin", adminRouter);

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
