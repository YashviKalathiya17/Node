const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Middleware to check login
function isAuth(req, res, next){
    if(req.session.user) return next();
    req.flash('error_msg', 'Please login first');
    res.redirect('/login');
}

// Dashboard - List posts
router.get('/dashboard', isAuth, async (req, res) => {
    const posts = await Post.find({ author: req.session.user.username });
    res.render('dashboard', { user: req.session.user, posts });
});

// Create post
router.get('/create', isAuth, (req, res) => res.render('create'));
router.post('/create', isAuth, async (req, res) => {
    const { title, content } = req.body;
    await Post.create({ title, content, author: req.session.user.username });
    req.flash('success_msg', 'Post created');
    res.redirect('/posts/dashboard');
});

// Edit post
router.get('/edit/:id', isAuth, async (req, res) => {
    const post = await Post.findById(req.params.id);
    res.render('edit', { post });
});
router.post('/edit/:id', isAuth, async (req, res) => {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    req.flash('success_msg', 'Post updated');
    res.redirect('/posts/dashboard');
});

// Delete post
router.get('/delete/:id', isAuth, async (req, res) => {
    await Post.findByIdAndDelete(req.params.id);
    req.flash('success_msg', 'Post deleted');
    res.redirect('/posts/dashboard');
});

module.exports = router;
