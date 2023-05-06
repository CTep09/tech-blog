const router = require("express").Router();
const { Post } = require("../../models");
const withAuth = require("../../utils/auth");

// Create a new post /api/posts
router.post("/", withAuth, async (req, res) => {
  const { body } = req;

  try {
    const newPost = await Post.create({ ...body, userId: req.session.userId });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Update a post
router.put("/:id", withAuth, async (req, res) => {
  try {
    const [posts] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (posts > 0) {
      res.status(200).end();
    } else {
      res.status(400).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
