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
router.post("/", requireAuth(), async (req, res) => {
  try {
    const { content } = req.body;

    // Get the authenticated user ID from Clerk session
    const clerkUserId = req.auth.userId;

    // Optionally fetch user info from Clerk if needed
    const user = await clerkClient.users.getUser(clerkUserId);

    const post = new Post({
      content,
      clerkUserId,
      userEmail: user.emailAddresses[0].emailAddress, // example
      userName: user.firstName + " " + user.lastName, // example
    });

    const saved = await post.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = router;
