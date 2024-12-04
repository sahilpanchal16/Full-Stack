const { menData } = require("../Models/Men");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(__dirname, "../imgs")); // Ensure the path is correctly set
//   },
//   filename: function (req, file, cb) {
//     const prefix = Date.now() + "-" + Math.round(Math.random() * 100000);
//     cb(null, prefix + "-" + file.originalname);
//   },
// });

const upload = multer({ storage });
// get
const getwomen = async (req, res) => {
  try {
    const data = await womenData.find();
    res.json({
      data: data,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const createwomen = async (req, res) => {
  try {
    const req_body = req.body;
    const women_name = req_body.women_name;
    const option = req_body.option;
    const price = req_body.price;
    const poster = req.file ? req.file.filename : " ";
    await womenData.create({
      women_name,
      option,
      price,
      poster,
    });

    res.json({
      msg: "women Detail Create successful",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
// delete
const deletewomen = async (req, res) => {
  try {
    const { id } = req.params;
    const women = await womenData.findOne({ _id: id });
    if (women) {
      const poster = women.poster;
      let poster_path = null;
      if (poster) {
        poster_path = path.join(__dirname, "../imgs", poster);
        fs.unlinkSync(poster_path);
      }
      await womenData.deleteOne({ _id: id });
      res.json({
        msg: "women data deleted Succesful",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// update
const updatewomen = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatewomen = await menData.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatewomen) {
      return res.status(404).json({
        msg: "men not found",
      });
    }

    res.json({
      msg: "updated successfully",
      data: updatewomen,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = { getwomen, createwomen, deletewomen, updatewomen };
