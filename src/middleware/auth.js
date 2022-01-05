// jshint esversion:8
const jwt = require('jsonwebtoken');
// const cookieParser = require('cookie-parser');
const User = require('../models/userModels');

const auth = async (req, res, next) => {
  try {
    const token = req.cookies.auth_token;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({_id: decoded._id, 'tokens.token': token});

    if(!user) {
      throw new Error();
    }
    req.user = user;
    req.token = token;
    next();
  } catch(err) {
    res.status(401).redirect('/users/register');
  }
};

module.exports = auth;
