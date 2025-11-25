const jwt = require('jsonwebtoken');
const User = require('../models/User');

const signToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role, username: user.username }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN || '7d' });
}

exports.register = async (req, res) => {
  try{
    const { username, password, role } = req.body;
    const exists = await User.findOne({ username });
    if(exists) return res.render('register', { error: 'Username taken', user: null });

    const user = new User({ username, password, role });
    await user.save();
    const token = signToken(user);
    res.cookie(process.env.COOKIE_NAME || 'token', token, { httpOnly: true, maxAge: 1000*60*60*24*7 });
    res.redirect('/');
  }catch(err){
    console.error(err);
    res.render('register', { error: 'Registration failed', user: null });
  }
}

exports.login = async (req, res) => {
  try{
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if(!user) return res.render('login', { error: 'Invalid credentials', user: null });
    const ok = await user.comparePassword(password);
    if(!ok) return res.render('login', { error: 'Invalid credentials', user: null });

    const token = signToken(user);
    res.cookie(process.env.COOKIE_NAME || 'token', token, { httpOnly: true, maxAge: 1000*60*60*24*7 });
    res.redirect('/tasks');
  }catch(err){
    console.error(err);
    res.render('login', { error: 'Login failed', user: null });
  }
}

exports.logout = (req, res) => {
  res.clearCookie(process.env.COOKIE_NAME || 'token');
  res.redirect('/');
}
