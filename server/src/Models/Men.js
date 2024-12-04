const mongoose = require("mongoose");

const menScrema = new mongoose.Schema({
  men_name: {
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

const menData = mongoose.model("menData", menScrema);
module.exports = { menData };
