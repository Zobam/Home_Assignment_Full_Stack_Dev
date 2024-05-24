const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
// models
const Message = require("./models/messageModel");
const User = require("./models/userModel");
// routes
const userRoutes = require("./routes/user");
const messagesRoute = require("./routes/messages");
// mongoose
const mongoose = require("mongoose");
const uri = `mongodb+srv://${process.env.MONGODB_ATLAS_USER}:${process.env.MONGODB_ATLAS_USER_PASSWORD}@messages.5cc75uy.mongodb.net/?retryWrites=true&w=majority&appName=messages`;

const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.urlencoded({ extended: true }));
// create a mongo db client
const clientOptions = {
  serverApi: { version: "1", strict: true, deprecationErrors: true },
  dbName: "mail",
};
mongoose.connect(uri, clientOptions);
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("connection to db established");
});

app.get("/", (req, res) => {
  res.status(200).send({
    status: "success",
    data: [
      {
        subject: "Hi Again",
        content: "You are on the home page",
        isRead: false,
      },
    ],
  });
});

app.use(messagesRoute);
app.use(userRoutes);
/* app.get("/messages", async (req, res) => {
  try {
    const messages = await Message.find({});
    res.status(200).json({ status: "success", data: messages });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
}); */

/* app.put("/messages/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByIdAndUpdate(id, { isRead: true });
    if (!message) {
      return res.status(404).json({
        status: "error",
        message: `cannot find message with id: ${id}`,
      });
    }

    res.status(200).json({
      status: "success",
      messages: "message marked as read",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ status: "error", message: error.message });
  }
}); */

app.listen(3200, () => {
  console.log("express node api is running on port 3200");
});
