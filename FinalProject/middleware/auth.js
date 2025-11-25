const jwt = require('jsonwebtoken');

exports.verifyToken = async (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME || 'token'];
  if(!token) return res.redirect('/login');
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role, username: decoded.username };
    next();
  }catch(err){
    res.clearCookie(process.env.COOKIE_NAME || 'token');
    return res.redirect('/login');
  }
}

// optional: attach user if exists (for showing navbar)
exports.verifyTokenOptional = async (req, res, next) => {
  const token = req.cookies[process.env.COOKIE_NAME || 'token'];
  if(!token){ req.user = null; res.locals.user = null; return next(); }
  try{
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: decoded.id, role: decoded.role, username: decoded.username };
    res.locals.user = req.user;
    return next();
  }catch(err){
    res.clearCookie(process.env.COOKIE_NAME || 'token');
    req.user = null; res.locals.user = null; return next();
  }
}
