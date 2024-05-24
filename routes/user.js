const express = require("express");
const router = express.Router();
const {
  signin,
  signup,
  getUsers,
} = require("../controllers/auth_controller.js");

router.post("/sign-up", signup, function (req, res) {});
router.post("/sign-in", signin, function (req, res) {});
router.get("/users", getUsers, function (req, res) {});

module.exports = router;
