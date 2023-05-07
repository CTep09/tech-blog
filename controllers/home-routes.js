const router = require('express').Router();

router.get('/', async (req, res) => { 
    res.render('homepage')
})
router.get('/login', async (req, res) => { 
    res.render('login')
})
router.get('/signup', async (req, res) => { 
    res.render('signup')
})
router.get('/signup', async (req, res) => { 
    res.render('dashboard')
})
router.get('/logout', async (req, res) => { 
    res.render('logout')
})

module.exports = router;