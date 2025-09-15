const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', async (req, res) => {
    const { username, email, password, password2 } = req.body;
    if(password !== password2){
        req.flash('error_msg', 'Passwords do not match');
        return res.redirect('/register');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ username, email, password: hashedPassword });
    await newUser.save();
    req.flash('success_msg', 'You are now registered');
    res.redirect('/login');
});

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Login Handle
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if(!user){
        req.flash('error_msg', 'User not found');
        return res.redirect('/login');
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        req.flash('error_msg', 'Incorrect password');
        return res.redirect('/login');
    }
    req.session.user = user;
    res.redirect('/posts/dashboard');
});

// Logout
router.get('/logout', (req, res) => {
    req.session.destroy();
    res.redirect('/login');
});

module.exports = router;
