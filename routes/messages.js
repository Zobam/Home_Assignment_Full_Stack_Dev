const express = require("express");
const router = express.Router();
const messageController = require("../controllers/messageController");
const verifyToken = require("../middleware/authJWT");

// add new message
router.post("/messages", verifyToken, messageController.createMessage);

// get all messages
router.get("/messages", verifyToken, messageController.getMessages);

// update specific message
router.put("/messages/:id", verifyToken, messageController.updateMessage);

module.exports = router;
