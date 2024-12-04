const express = require("express");
const path = require("path");
const { authToken } = require("../Middlewares/UserValidation");
const router = express.Router();

const {
  getWomen,
  createWomen,
  deleteWomen,
  updateWomen,
} = require("../Controllers/Women");
router.get("/", (req, res) => {
  res.send("Women's route");
});
const WoMen_route = express.Router();
WoMen_route.use("/img", express.static(path.join(__dirname, "../imgs")));

WoMen_route.get("/get", authToken, getWomen);
WoMen_route.post("/create", upload.single("poster"), createWomen);
WoMen_route.delete("/delete/:id", deleteWomen);
WoMen_route.put("/update/:id", upload.single("poster"), updateWomen);

module.exports = {WoMen_route};
