const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

const app = express();

// MongoDB connection
mongoose.connect('mongodb://127.0.0.1:27017/blogDB', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB connected'))
.catch(err => console.log(err));

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    next();
});

// Routes
app.use('/', authRoutes);
app.use('/posts', postRoutes);

// Server
app.listen(3000, () => console.log('Server running on http://localhost:3000'));
