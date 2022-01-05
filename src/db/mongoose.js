// jshint esversion:6

// const validator = require('validator');
const mongoose = require('mongoose');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser:true,
  useCreateIndex: true,
  useFindAndModify: false,
  // must have ~ mongoose.connect({useUnifiedTopoligy: true}
  useUnifiedTopology: true
});