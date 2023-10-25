const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const corsOptions = {
  origin: "http://localhost:3000",
  credentials: true,
};
const app = express();
const FeaturedNewsRoute = require("./routers/featuredNewsRoute");
const AuthorsRoute = require("./routers/authorsRoute");
const AllNewsRoute = require("./routers/allNewsRoute")

const session = require("express-session");
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  // Other headers and configurations...
  next();
});
app.use(cors(corsOptions));
var bodyParser = require("body-parser");
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  bodyParser.urlencoded({
    limit: "50mb",
    extended: true,
    parameterLimit: 50000,
  })
);

app.use(
  session({
    secret: "This will be secret",
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
    },
  })
);

mongoose
  .connect(
    "mongodb+srv://BlogAdmin:D4Nac0tSV0w926x8@db.div0wcp.mongodb.net/TFN?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => {
    console.log("DB connected");
  })
  .catch((err) => {
    console.log("Not connected " + err);
  });

app.use(FeaturedNewsRoute);
app.use(AuthorsRoute);
app.use(AllNewsRoute);

// Server
app.listen(5000, () => {
  console.log("Server started");
});
