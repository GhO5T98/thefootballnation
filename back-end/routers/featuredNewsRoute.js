const express = require("express");
const featuredNewsModel = require("../models/featuredNews");
const app = express();

app.post("/addfeaturednews", async (req, res) => {
  const { id, newsNr, carouselImg, tag, tagCol, newsTitle, author, createdAt } =
    req.body;

  try {
    const { cards } = req.body;
    const featuredNews = new featuredNewsModel({ cards });
    await featuredNews.save();
    res.status(201).json({ message: "News card added successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to add news card" });
  }
});

// Read Properties
app.get("/get_all", async (req, res) => {
  try {
    const ftNews = await featuredNewsModel.find({});
    res.status(200).send(ftNews);
  } catch (err) {
    res.status(500).send("Date not shown" + err);
  }
});

// Read Property
app.get("/getFtNews/:id", async (req, res) => {
  try {
    const ftNewsId = req.params.id;
    const featuredNews = await featuredNewsModel.findById({_id:ftNewsId});

    if (!featuredNews) {
      return res.status(404).send("Featured news not found");
    }

    res.status(200).send(featuredNews.cards);
  } catch (err) {
    res.status(500).send("Info not shown " + err);
  }
});

module.exports = app;
