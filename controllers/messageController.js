const Message = require("../models/messageModel");

exports.createMessage = async (req, res) => {
  try {
    const message = await Message.create(req.body);
    res.status(200).json({
      data: message,
      status: "success",
    });
  } catch (error) {
    console.log(error.message);
    res.status(422).json({ message: error.message });
  }
};

exports.getMessages = async (req, res) => {
  if (!req.user) {
    res.status(403).send({
      message: "Invalid jwt token",
    });
  } else {
    try {
      const messages = await Message.find({ receiverID: req.user._id })
        .sort({ createdAt: -1 })
        .select({});
      res.status(200).json({ status: "success", data: messages });
    } catch (error) {
      console.log(error.message);
      res.status(500).json({ message: error.message });
    }
  }
};

exports.updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    // const product = await Product.findById(id)
    const message = await Message.findByIdAndUpdate(id, { isRead: true });
    if (!message) {
      return res
        .status(404)
        .json({ message: `cannot find message with id: ${id}` });
    }
    const updatedMessage = await Message.findById(id);
    res.status(200).json({ updatedMessage });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
