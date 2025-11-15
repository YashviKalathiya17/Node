const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
require('dotenv').config();
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
const app = express();

const PORT = process.env.PORT || 5000;

// Connect DB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/taskapp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('MongoDB error', err));

// Middlewares
app.use(expressLayouts);
app.set('layout', 'layouts/main');
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method'));
app.use(express.static(path.join(__dirname, 'public')));

// Make user available in all views if logged in
const { verifyTokenOptional } = require('./middleware/auth');
app.use(verifyTokenOptional);

// Routes
app.use('/', require('./routes/authRoutes'));
app.use('/tasks', require('./routes/taskRoutes'));
app.use('/admin', require('./routes/adminRoutes'));

app.get('/', (req, res) => {
    res.render('index', { user: req.user });
});

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
