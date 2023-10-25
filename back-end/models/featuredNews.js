const mongoose = require('mongoose');

const newsCardSchema = new mongoose.Schema({
  newsNr: String,
  carouselImg: String,
  tag: String,
  tagCol: String,
  newsTitle: String,
  author: String,
 },{ timestamps: true });

const featuredNewsSchema = new mongoose.Schema({
  slideId: Number,
  cards: [newsCardSchema],
});



const FeaturedNews = mongoose.model('FeaturedNews', featuredNewsSchema);

module.exports = FeaturedNews;