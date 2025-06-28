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
import rateLimit from "express-rate-limit";
import helmet from "helmet";

dotenv.config();

const app = express();


app.use(helmet()); // Security middleware to set various HTTP headers
app.set("trust proxy", 1); // Still needed for production

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,      // limit each IP to 100 requests per windowMs
  keyGenerator: (req) => req.ip // Limits by IP
});

app.use(limiter);


app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.status(200).send({ message: "Healthy Route! Ready to serve" });
});

const allowedOrigins = [
  "https://www.clubpratibimb.com",
];

const corsOptions = {
  origin: (origin, callback) => {
    // Development: Allow no-origin (Postman) + localhost
    if (process.env.NODE_ENV === "development") {
      if (!origin || origin.startsWith("http://localhost:") || origin.startsWith("http://127.0.0.1:")) {
        return callback(null, true);
      }
    }

    // Production: Only allowedOrigins
    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    callback(new Error(`Origin ${origin} not allowed by CORS`));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization", "X-API-Key"], // Add X-API-Key 
};

app.use(cors(corsOptions));

app.options('*', cors(corsOptions)); 

app.use((req, res, next) => {
  // Skip API key check for OPTIONS preflight requests
  if (req.method === 'OPTIONS') return next();
  
  const apiKey = req.headers["x-api-key"];
  
  if (!apiKey) {
    return res.status(403).json({ error: "API key is required " });
  }
  
  if (apiKey !== process.env.API_KEY) {
    return res.status(403).json({ error: "Invalid API key" });
  }
  
  next();
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
