if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();

const path = require("path");
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

app.set("views", path.join(__dirname, "views")); // set the directory for jsx views
app.set("view engine", "jsx"); // set the view engine to use jsx

// jsx rendering
app.engine("jsx", require("express-react-views").createEngine());

// route for login page
app.get("/login", (req, res) => {
  res.render("login");
});

// route for register page
app.get("/register", (req, res) => {
  res.render("register");
});

// login post
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/index.jsx", // redirect on successful login
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
  res.render("index.jsx");
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

// handle requests to access short URLs
app.get("/:shortUrl", async (req, res) => {
  const shortUrl = await ShortUrl.findOne({ short: req.params.shortUrl }); // check if short url exists
  if (shortUrl == null) return res.sendStatus(404);

  res.redirect(shortUrl.full);
});

// CRUD
// create a new short URL
app.post("/urls", async (req, res) => {
  try {
    const { fullUrl } = req.body;

    // check if a valid full url is provided
    if (!fullUrl) {
      return res.status(400).json({ error: "Full URL is required" });
    }

    // create a new short url
    const shortUrl = await ShortUrl.create({ full: fullUrl });

    res.status(201).json({ shortUrl }); // success
  } catch (error) {
    console.error("Error creating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// read all short URLs
app.get("/urls", async (req, res) => {
  try {
    // get all short urls
    const shortUrls = await ShortUrl.find();

    res.status(200).json(shortUrls); // success
  } catch (error) {
    console.error("Error reading short URLs:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// read a specific short URL by ID
app.get("/urls/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // find a short url by its id
    const shortUrl = await ShortUrl.findById(id);

    // url not found
    if (!shortUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // success
    res.status(200).json(shortUrl);
  } catch (error) {
    console.error("Error reading short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// update a short URL by ID
app.put("/urls/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { fullUrl } = req.body;

    // check if a valid full url is provided
    if (!fullUrl) {
      return res.status(400).json({ error: "Full URL is required" });
    }

    // update the short url
    const shortUrl = await ShortUrl.findByIdAndUpdate(
      id,
      { full: fullUrl },
      { new: true }
    );

    // url not found
    if (!shortUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // success
    res.status(200).json(shortUrl);
  } catch (error) {
    console.error("Error updating short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// delete a short URL by ID
app.delete("/urls/:id", async (req, res) => {
  try {
    const { id } = req.params;

    // find and delete a short url by its id
    const shortUrl = await ShortUrl.findByIdAndDelete(id);

    // url not found
    if (!shortUrl) {
      return res.status(404).json({ error: "Short URL not found" });
    }

    // success
    res.status(204).send();
  } catch (error) {
    console.error("Error deleting short URL:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

app.listen(5000);
