const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../user/model");

exports.hashPass = async (req, res, next) => {
  try {
    // const tempPass = req.body.password; //grabbed password variable from body, and stored it locally
    // const hashedPass = await bcrypt.hash(tempPass, 8); //hashed the password and stored it as new constant
    //req.body.password = hashedPass; //stores hashed password back in the req body
    req.body.password = await bcrypt.hash(req.body.password, 8); //combines above code into one line
    next(); //moves onto next middleware/controller in endpoint
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.unhashPass = async (req, res, next) => {
  try {
    req.user = await User.findOne({ username: req.body.username });
    // const match = ;
    if (await bcrypt.compare(req.body.password, req.user.password)) {
      // req.user = user;
      next();
    } else {
      throw new Error("Incorrect Credentials");
    }
    next();
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};

exports.tokenCheck = async (req, res, next) => {
  try {
    const decodedToken = jwt.verify(
      req.header("Authorization"),
      process.env.SECRET
    );
    req.user = await User.findById(decodedToken.id);
    next();
  } catch (error) {
    console.log(error);
    res.send({ error });
  }
};
