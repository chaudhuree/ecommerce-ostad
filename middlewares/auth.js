const jwt =require("jsonwebtoken");
const User =require("../models/user.js");

exports.requireSignin = (req, res, next) => {
  try {
    const decoded = jwt.verify(
      req.headers.authorization,  //we will send the token through header
      process.env.JWT_SECRET
    );
  
    req.user = decoded; //=_id,
    //inside decoder we have _id: user._id. and we now set it into req.user
    //so from the controller we will have the _id from req.user
    next();
  } catch (err) {
    return res.status(401).json(err);
  }
};
//after require login isAdmin middleware may be called in ruter
//then this function will run
exports.isAdmin = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    if (user.role !== 1) {
      return res.status(401).send("Unauthorized");
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};
