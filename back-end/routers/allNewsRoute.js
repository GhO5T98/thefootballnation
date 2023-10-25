const express = require("express");
const allNewsModel = require("../models/allNews");
const app = express();


app.post("/addNews", async (req, res) => {
    try {
        const newNews = new allNewsModel(req.body);
        await newNews.save();
        res.status(200).send("News Added");
      } catch (err) {
        res.status(500).send("Not created" + err);
      }
});

// Read Properties
app.get("/getNews", async (req, res) => {
  try {
    const allNews = await allNewsModel.find({});
    res.status(200).send(allNews);
  } catch (err) {
    res.status(500).send("Date not shown" + err);
  }
});

// Read Property
app.get("/getNewsDetail/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    const news = await allNewsModel.findById({ _id: newsId });
    res.status(200).send(news);
  } catch (err) {
    res.status(500).send("Info not shown " + err);
  }
});

//Update Property
app.patch("/updateNews/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    const newsUpdate = req.body;
    const newsUpd = await allNewsModel.findByIdAndUpdate(
      { _id: newsId },
      { $set: newsUpdate },
      { new: true }
    );
    res.status(200).send(newsUpd);
  } catch (err) {
    res.status(500).send("News Not Updated " + err);
  }
});

//Delete News
app.delete("/delete/:id", async (req, res) => {
  try {
    const newsId = req.params.id;
    await allNewsModel.deleteOne({ _id: newsId });
    res.status(200).send("Property Deleted");
  } catch (err) {
    res.status(500).send("Property not deleted " + err);
  }
});


module.exports = app;
