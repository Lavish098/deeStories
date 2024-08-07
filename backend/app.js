const express = require("express");
const dotenv = require("dotenv");
const mongoose = require('mongoose')
const path = require('path')
const connectDB = require("./config/db");
const methodOverride = require('method-override')
const passport = require('./config/password')
const session = require('express-session');
const flash = require('connect-flash');
const MongoStore = require('connect-mongo');




dotenv.config({ path: "./config/config.env" });


connectDB();

const app = express();

app.use(express.static(path.join(__dirname, "public")))

//sessions
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI})
}))

app.use(flash());


//passport middleware
app.use(passport.initialize())
app.use(passport.session())


app.use(express.urlencoded({extended: false}))
app.use(express.json())


app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    let method = req.body._method
    delete req.body._method
    return method
  }
}))




app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

app.get('/flash', (req, res) => {
  const flashMessages = {
    success: req.flash('success_msg'),
    error: req.flash('error_msg'),
    authError: req.flash('error'), 
    // Add more types as needed
  }
  console.log(flashMessages);
  res.json(flashMessages);
});



const PORT = process.env.PORT || 4000;

app.listen(
  PORT,
  console.log(`server running in ${process.env.NODE_ENV} mode on ${PORT}`)
);
