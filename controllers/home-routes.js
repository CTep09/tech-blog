// Importing dependencies
const router = require("express").Router();
const { Post, Comment, User } = require("../models");

// Get all posts at root endpoint '/'
router.get("/", async (req, res) => {
  try {
    // Find all posts and include the associated User model
    const postData = await Post.findAll({
      include: [User],
    });

    // Map the post data to plain objects
    const posts = postData.map((post) => post.get({ plain: true }));
    console.log(posts)
    //  render the 'all-posts' template and pass in the post data
    res.render("all-posts-admin", { posts, loggedIn: req.session.loggedIn });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Get a single post by its ID at '/posts/:id' endpoint
router.get("/posts/id", async (req, res) => {
  try {
    // Find the post by its ID and include the associated User and Comment models
    const postData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (postData) {
      // If post exists, retrieve its plain object representation
      const post = postData.get({ plain: true });

      // Render the 'single-post' template and pass in the post data
      res.render("single-post", { post });
    } else {
      // If the post doesn't exist, send a 404 status code
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// Render the 'login' template at '/signup' endpoint
router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {

    // If the user is already logged in, redirect to the root endpoint
    res.redirect("/");
    return;
  }
  // Render the 'login' template
  res.render("signup");
});

// Render the 'signup' template at '/login' endpoint
router.get("/login", (req, res) => {
  if (req.session.loggedIn) {

     // If the user is already logged in, redirect to the root endpoint
    res.redirect("/");
    return;
  }
  // Render the 'login' template
  res.render("login");
});

// Export router
module.exports = router;
