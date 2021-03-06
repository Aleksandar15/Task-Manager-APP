// jshint esversion: 8
require('dotenv').config({path: './config/dev.env'});
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
require('./db/mongoose');
// const User = require('./models/userModels');
// const Task = require('./models/taskModels');
const userRouter = require('./routers/userRouters');
const taskRouter = require('./routers/taskRouters');
const generalRouter = require('./routers/home-page');

const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(cookieParser());
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');
app.use(userRouter);
app.use(taskRouter);
app.use(generalRouter);


module.exports = app;
