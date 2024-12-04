const express = require("express");
const path = require("path");
const { authToken } = require("../Middlewares/UserValidation");
const router = express.Router();

const {
  getmen,
  createmen,
  deletemen,
  updatemen,
} = require("../Controllers/men");
router.get("/", (req, res) => {
  res.send("men's route");
});
const Men_route = express.Router();
WoMen_route.use("/img", express.static(path.join(__dirname, "../imgs")));

Men_route.get("/get", authToken, getmen);
Men_route.post("/create", upload.single("poster"), createmen);
Men_route.delete("/delete/:id", deletemen);
Men_route.put("/update/:id", upload.single("poster"), updatemen);

module.exports = { Men_route }