const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
const jwt = require("jsonwebtoken");
const authorsModel = require("../models/authors");

// register
app.post("/register", async (req, res) => {
  const authorInfo = req.body;
  try {
    if (authorInfo.username == " " && authorInfo.fullname == " ") {
      return res.status(404).send("Field are empty");
    }
    if (authorInfo.password < 3) {
      return res.status(404).send("Short password");
    }

    let foundAuthor = await authorsModel
      .findOne({ fullName: authorInfo.fullName })
      .exec();

    if (foundAuthor) {
      return res.status(400).send("This user exist");
    } else {
      const salt = await bcrypt.genSalt(10);

      let hashed = await bcrypt.hash(authorInfo.password, salt);
      // info e user-ve
      let newAuthor = new authorsModel({
        fullName: authorInfo.fullName,
        username: authorInfo.username,
        email: authorInfo.email,
        password: hashed,
      });
      await newAuthor.save();
      return res.status(200).send("Author Created");
    }
  } catch (error) {
    res.status(500).send("Not created " + error);
  }
});

// login
app.post("/signin", async (req, res) => {
  const fullName = req.body.fullName;

  const passwords = req.body.password;
  try {
    let authorGet = await authorsModel.findOne({ fullName: fullName }).exec();

    if (authorGet) {
      bcrypt.compare(passwords, authorGet.password, (error, result) => {
        if (result) {
          const token = jwt.sign({ fullName: authorGet.fullName }, "secretKey");

          return res.status(200).json(token);
        } else {
          return res.status(400).send("Invalid credentials");
        }
      });
    } else {
      return res.status(400).send("Invalid credentials");
    }
  } catch (error) {
    res.status(500).send("Something is wrong " + error);
  }
});

// logout
app.post("/logout", async (req, res) => {
  try {
    localStorage.removeItem("token");
    res.redirect("/login");
  } catch (error) {
    res.status(500).send("Error " + error);
  }
});

module.exports = app;
