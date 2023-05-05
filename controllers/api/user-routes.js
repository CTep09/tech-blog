const router = require('express').Router();
const { User } = require('../../models');

// Create a new blog user
router.post('/', async (req, res) => {
    try {
        const blogUserData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        });

        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json(blogUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const blogUserData = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (!blogUserData) {
            res.status(400).json({message: 'Email or Password is incorrect, please try again.'});
            return;
        }

        const validPassword = await blogUserData.checkPassword(req.body.password);

        if (!blogUserData) {
            res.status(400).json({message: 'Email or Password is incorrect, please try again.'});
            return;
        }

        req.session.save(() => {
            req.session.loggedIn = true;

            req.status(200).json({user: blogUserData, message: 'You are logged in!'});
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

// Log out route
router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});