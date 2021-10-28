const express = require("express");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const bodyParser = require("body-parser");
const path = require("path");
const fs = require("fs");
const describeVPCandInstances = require("./routes/describeVPCandInstances");
const startStopInstance = require("./routes/startStopInstance");
const createInstance = require("./routes/createInstance");
const createEnvironment = require("./routes/createEnvironment");
const contact = require("./routes/contact");
const terminateInstance = require("./routes/terminateInstance");
const docs = require("./routes/docs");
const app = express();
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/views"));
app.use(express.json());
// cookie parser middleware
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

// creating 24 hours from milliseconds
const oneDay = 1000 * 60 * 60 * 24;
//username and password
const myusername = "admin";
const mypassword = "admin";

// a variable to save a session
//session middleware
app.use(
  session({
    secret: "Keep it secret",
    name: "uniqueSessionID",
    resave: false,
    saveUninitialized: false,
  })
);
app.get("/login", (req, res) => {
  res.sendFile("login.html", { root: path.join(__dirname, "views") });
});
const check = (req, res, next) => {
  if (req.session.loggedIn) {
    next();
  } else {
    res.redirect("/login");
  }
};

app.use("/", describeVPCandInstances);
app.use("/startStopInstance", startStopInstance);
app.use("/createInstance", createInstance);
app.use("/createEnvironment", createEnvironment);
app.use("/contact", check, contact);
app.use("/terminateInstance", terminateInstance);
app.use("/docs", docs);

app.post(
  "/authenticate",

  (req, res, next) => {
    console.log(req.body);
    // Actual implementation would check values in a database
    if (req.body.username == "foo" && req.body.password == "bar") {
      res.locals.username = req.body.username;
      console.log("valid!");
      next();
    } else res.sendStatus(401);
  },
  (req, res) => {
    req.session.loggedIn = true;
    req.session.username = res.locals.username;
    console.log(req.session);
    res.redirect("/");
  }
);
app.get("/logout", (req, res) => {
  req.session.destroy((err) => {});
  res.redirect("/login");
  res.send("Thank you! Visit again");
});
app.listen(3000, () => {
  console.log("listening on port 3000...");
});
