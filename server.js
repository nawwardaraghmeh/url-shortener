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
