
const methodOverride = require("method-override");
const morgan = require("morgan");
const dotenv = require("dotenv");
const session = require('express-session');
dotenv.config();
const express = require("express");
require('./config/database');

//Controllers
const authController = require("./controllers/auth.js");


const app = express();
// Set the port from environment variable or default to 3000
const port = process.env.PORT ? process.env.PORT : "3000";


// Middleware to parse URL-encoded data from forms
app.use(express.urlencoded({ extended: false }));
// Middleware for using HTTP verbs such as PUT or DELETE
app.use(methodOverride("_method"));
// Morgan for logging HTTP requests
app.use(morgan('dev'));

// new
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);

app.use("/auth", authController);



// server.js

// GET /

 //public routes
app.get("/", (req, res) => {
    res.render("index.ejs", {
      user: req.session.user,
    });
  });

  //protected routes
 app.get("/protected", (req, res) => {
    if (req.session.user) {
      res.send(`Welcome to the party ${req.session.user.username}.`);
    } else {
      res.send("Sorry, no guests allowed.");
    }
  });


app.listen(port, () => {
  console.log(`The express app is ready on port ${port}!`);
});