const express = require("express");
const router = express.Router();
const Post = require("../models/Post");
const { Clerk } = require("@clerk/clerk-sdk-node");

const clerk = new Clerk({ apiKey: process.env.CLERK_API_KEY });

// GET /api/posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }).limit(100);
    res.json(posts);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/posts
router.post("/", async (req, res) => {
  try {
    // Optionally verify Clerk session if frontend passes a session token or user id.
    // For now we accept public posts; to require auth, pass token from client and verify here.
    const { content, clerkUserId } = req.body;
    const p = new Post({ content, clerkUserId });
    const saved = await p.save();
    res.status(201).json(saved);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Invalid data" });
  }
});

module.exports = router;
