if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const bcrypt = require("bcrypt");
const passport = require("passport");
const initializePassport = require("./passport");

const flash = require("express-flash");
const session = require("express-session");

initializePassport(
  passport,
  (email) => users.find((user) => user.email === email),
  (id) => users.find((user) => user.id === id)
);

const users = [];

app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.set("view engine", "ejs");

// route for login page
app.get("/login", (req, res) => {
  res.render("login.ejs");
});

// route for register page
app.get("/register", (req, res) => {
  res.render("register.ejs");
});
