// Importing dependencies
const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Create a new post /api/posts
router.post("/", withAuth, async (req, res) => {
  const { body } = req;

  try {
    // Creating new post and associating with corresponding userId
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post at '/api/posts/:id' endpoint
router.put("/:id", withAuth, async (req, res) => {
  try {
    // Update the post in the database based on provided Id
    const [posts] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (posts > 0) {
      // Success, send 200 status code
      res.status(200).end();
    } else {
      // else, send 400 status code
      res.status(400).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Exporting router
module.exports = router;
