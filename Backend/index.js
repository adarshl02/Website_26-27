const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const eventsRouter = require("./routes/events.routes.js");
const authRouter = require("./routes/auth.routes.js");
const userRouter = require("./routes/user.routes.js");
const volunteerRouter = require("./routes/volunteers.routes.js");

dotenv.config();

const app = express();

// app.use(cors({
//   origin: 'https://website-26-27-ten.vercel.app',  // Allow your frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],  // Allow the appropriate HTTP methods
//   credentials: true,  // If you're sending cookies or other credentials
// }));

app.use(express.json());

app.use("/api", eventsRouter);
app.use("/api", authRouter);
app.use("/api", userRouter);
app.use("/api", volunteerRouter);

app.listen(3000, () => {
  console.log("Server is running on port 3000!");
});
