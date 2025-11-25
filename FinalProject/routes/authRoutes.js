const express = require('express');
const router = express.Router();
const auth = require('../controllers/authController');

router.get('/register', (req, res) => res.render('register', { user: req.user, error: null }));
router.post('/register', auth.register);

router.get('/login', (req, res) => res.render('login', { user: req.user, error: null }));
router.post('/login', auth.login);

router.get('/logout', auth.logout);

module.exports = router;
