require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { clerkMiddleware } = require("@clerk/express");
const connectDB = require("./src/config/db");
const postsRoute = require("./src/routes/posts");
const { startCron } = require("./src/jobs/cronJob");

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;
const CLERK_SECRET_KEY = process.env.CLERK_SECRET_KEY;

// Validate required environment variables
if (!MONGO_URI) {
  console.error("MONGO_URI not set. Exiting.");
  process.exit(1);
}

if (!CLERK_SECRET_KEY) {
  console.error("CLERK_SECRET_KEY not set. Please add it to your .env file.");
  console.error("Get your key from: https://dashboard.clerk.com/last-active?path=api-keys");
  process.exit(1);
}

const app = express();

app.use(cors({ origin: ["http://localhost:5173"], credentials: true }));
app.use(bodyParser.json());

// Initialize Clerk middleware
// This populates req.auth with user info if authenticated, but doesn't enforce auth
// Routes can check req.auth themselves and return appropriate status codes
app.use(clerkMiddleware());

// Connect DB
connectDB(MONGO_URI);

// Root route
app.get("/", (req, res) => {
  res.json({ 
    message: "Social Dashboard API", 
    version: "1.0.0",
    endpoints: {
      health: "/api/health",
      posts: "/api/posts"
    }
  });
});

// API routes
app.use("/api/posts", postsRoute);

// simple health
app.get("/api/health", (req, res) => res.json({ status: "ok", now: new Date() }));

// 404 handler for API routes - return JSON instead of HTML
app.use("/api/*", (req, res) => {
  res.status(404).json({ error: "Route not found", path: req.path });
});

// 404 handler for all other routes
app.use((req, res) => {
  res.status(404).json({ error: "Route not found", path: req.path });
});

// Start cron jobs
startCron();

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
