// backend/src/routes/posts.js
const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { clerkClient, requireAuth } = require("@clerk/express");

// GET /api/posts - public endpoint
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(100);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/posts - protected endpoint
router.post("/", async (req, res) => {
  try {
    // Check if user is authenticated (Clerk middleware adds req.auth as a function)
    const auth = req.auth ? req.auth() : null;
    if (!auth || !auth.userId) {
      return res.status(401).json({ message: "Unauthorized - Please sign in" });
    }

    const { content } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ message: "Content is required" });
    }

    // Get the authenticated user ID from Clerk session
    const clerkUserId = auth.userId;

    // Optionally fetch user info from Clerk if needed
    const user = await clerkClient.users.getUser(clerkUserId);

    const post = new Post({
      content,
      clerkUserId,
      userEmail: user.emailAddresses[0]?.emailAddress || "unknown",
      userName: `${user.firstName || ""} ${user.lastName || ""}`.trim() || "Anonymous",
    });

    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error("Error creating post:", err);
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
});

module.exports = router;
