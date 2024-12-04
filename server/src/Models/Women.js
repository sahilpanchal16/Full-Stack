const mongoose = require("mongoose");

const womenScrema = new mongoose.Schema({
  women_name: {
    type: String,
    require: true,
  },
  option: {
    type: Number,
    require: true,
  },
  price: {
    type: Number,
    require: true,
  },
  poster: {
    type: String,
    require: true,
  },
});

const sofaData = mongoose.model("womenData", womenScrema);
module.exports = { womenData };
