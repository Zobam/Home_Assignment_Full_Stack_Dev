const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.signup = async (req, res) => {
  const user = new User({
    userName: req.body.userName,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  const newUser = await user.save().catch((err) => {
    res.status(500).send({
      message: err,
    });
  });
  console.log("the new user", newUser);

  res.status(200).send({
    message: "User successfully registered.",
  });
};

exports.signin = (req, res) => {
  console.log(req.body.email);
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: "User not found",
        });
      }

      const passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "invalid password",
        });
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.API_SECRET,
        {
          expiresIn: 86400,
        }
      );

      res.status(200).send({
        user: {
          userName: user.userName,
          email: user.email,
          id: user.id,
          accessToken: token,
        },
        message: "Login successful",
        status: "success",
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err,
      });
      return;
    });
};
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find({}).select({ password: 0 });
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ message: error.message });
  }
};
