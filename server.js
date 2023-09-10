if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const bcrypt = require("bcrypt"); // for password hashing
const passport = require("passport"); // import passport.js for authentication
const initializePassport = require("./passport"); // to initialize passport.js

const flash = require("express-flash"); // for flash (error) messages
const session = require("express-session"); // for session management

// initialize passport authentication
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
    secret: process.env.SESSION_SECRET, // for session encryption
    resave: false, // don't save session if unmodified
    saveUninitialized: false, // don't create session until something is stored
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

// login post
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/index.ejs", // redirect on successful login
    failureRedirect: "/login", // redirect on failed login
    failureFlash: true, // enable flash messages for login failures
  })
);

// register post
app.post("/register", async (req, res) => {
  try {
    // hash the user's password before storing it
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    users.push({
      id: Date.now().toString(),
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword,
    });
    res.redirect("/login"); // redirect to login page after successful registration
  } catch (e) {
    console.log(e);
    res.redirect("/register"); // redirect to registration page on error
  }
});

// route for home page
app.get("/index", (req, res) => {
  res.render("index.ejs");
});

//url shortenr
const mongoose = require("mongoose");
const ShortUrl = require("./models/shortUrl");

mongoose.connect("mongodb://localhost/urlShortener", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.urlencoded({ extended: false }));

// handle get request for the root url to display the short version
app.get("/", async (req, res) => {
  const shortUrls = await ShortUrl.find();
  res.render("index", { shortUrls: shortUrls });
});

// handle post request to create short URLs
app.post("/shortUrls", async (req, res) => {
  await ShortUrl.create({ full: req.body.fullUrl });

  res.redirect("/"); // redirect to the root url after creating a short version
});

// handle requests to access short URLs
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl }); // check if short url exists
  if (shortUrl == null) return res.sendStatus(404);

  shortUrl.save();

  res.redirect(shortUrl.full);
});

app.listen(2000);
