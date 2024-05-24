const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  senderID: {
    type: String,
    required: true,
  },
  receiverID: {
    type: String,
    required: true,
  },
  isRead: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Message = mongoose.model("Message", messageSchema);

module.exports = Message;
