// Importing dependencies
const router = require("express").Router();
const { Comment } = require("../../models");
const withAuth = require("../../utils/auth");

// Create a new comment /api/comments
router.post("/", withAuth, async (req, res) => {
  try {
    // Spread request body to get comment content
    // Assign userId from session to associate comment with user
    const newComment = await Comment.create({
      ...req.body,
      user_id: req.session.userId,
    });
    // Send new comment as JSON response
    res.json(newComment);
  } catch (err) {
    // If error, send err as JSON response
    res.status(500).json(err);
  }
});

module.exports = router;
