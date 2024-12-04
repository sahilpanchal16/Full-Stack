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
const getmen = async (req, res) => {
  try {
    const data = await menData.find();
    res.json({
      data: data,
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};

const createmen = async (req, res) => {
  try {
    const req_body = req.body;
    const men_name = req_body.men_name;
    const option = req_body.option;
    const price = req_body.price;
    const poster = req.file ? req.file.filename : " ";
    await menData.create({
      men_name,
      option,
      price,
      poster,
    });

    res.json({
      msg: "men Detail Create successful",
    });
  } catch (error) {
    res.json({
      error: error,
    });
  }
};
// delete 
const deletemen = async (req, res) => {
  try {
    const { id } = req.params;
    const men = await menData.findOne({ _id: id });
    if (men) {
      const poster = men.poster;
      let poster_path = null;
      if (poster) {
        poster_path = path.join(__dirname, "../imgs", poster);
        fs.unlinkSync(poster_path);
      }
      await menData.deleteOne({ _id: id });
      res.json({
        msg: "men data deleted Succesful",
      });
    }
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
// update
const updatemen = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedmen = await menData.findByIdAndUpdate(id, updateData, {
      new: true,
    });
    if (!updatedmen) {
      return res.status(404).json({
        msg: "men not found",
      });
    }

    res.json({
      msg: "updated successfully",
      data: updatedmen,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
module.exports = { getmen, createmen, deletemen, updatemen};
