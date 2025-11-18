require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const connectDB = require("./src/config/db");
const postsRoute = require("./src/routes/posts");
const { startCron } = require("./src/jobs/cronJob");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(bodyParser.json());

// Connect DB
if (!MONGO_URI) {
  console.error("MONGO_URI not set. Exiting.");
  process.exit(1);
}
connectDB(MONGO_URI);

// API routes
app.use("/api/posts", postsRoute);

// simple health
app.get("/api/health", (req, res) => res.json({ status: "ok", now: new Date() }));

// Start cron jobs
startCron();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
