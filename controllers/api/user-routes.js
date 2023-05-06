const router = require("express").Router();
const { User } = require("../../models");

// Create a new blog user
router.post("/", async (req, res) => {
  try {
    const blogUserData = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    // Set up sessions with a 'loggedIn' variable set to `true`
    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.status(200).json(blogUserData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const blogUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!blogUserData) {
      res
        .status(400)
        .json({ message: "Username or Password is incorrect, please try again." });
      return;
    }

    const loginPw = await blogUserData.checkPassword(req.body.password);

    if (!loginPw) {
      res
        .status(400)
        .json({ message: "Username or Password is incorrect, please try again." });
      return;
    }


    // Once the user successfully logs in,variable 'loggedIn' is true
    req.session.save(() => {
        req.session.userId = newUser.id;
        req.session.username = newUser.username;
        req.session.loggedIn = true;

      req
        .status(200)
        .json({ user: blogUserData, message: "You are logged in!" });
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Log out route
router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
