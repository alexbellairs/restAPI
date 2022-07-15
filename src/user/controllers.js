const jwt = require("jsonwebtoken");
const User = require("./model");

exports.signUp = async (req, res) => {
  try {
    const newUser = await User.create(req.body); //req.body is an object that containsk/v pairs that match my User model
    const token = jwt.sign({ id: newUser._id }, process.env.SECRET); //sign method creates a token with object payload hiden in it
    console.log(token);
    res.send({ user: newUser, token });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.searchUser = async (req, res) => {
  try {
    const Users = await User.find(req.body); //req.body is an object that containsk/v pairs that match my User model
    res.send({ user: Users });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    await User.deleteOne({ username: req.params.username });
    res.end();
    console.log(req.params.username);
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.editUser = async (req, res) => {
  try {
    const editUser = await User.updateOne(
      req.body.filterObj,
      req.body.updateObj
    );
    res.send({ user: editUser });
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.login = async (req, res) => {
  try {
    // const user = await User.findOne({
    //   username: req.body.username,
    //   password: req.body.password,
    // });
    console.log("in login " + req.user);
    if (!req.user) {
      throw new Error("Incorrect Credentials");
    } else {
      const token = jwt.sign({ id: req.user._id }, process.env.SECRET);
      res.send({ user: req.user, token });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.listUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username });
    if (!user) {
      throw new Error("No user found");
    } else {
      res.send({ user });
    }
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
