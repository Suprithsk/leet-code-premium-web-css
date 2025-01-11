const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.isUser = async (req, res, next) => {
  // const user= jwt.decode()
  // user.userName=='admin'
  // req.Header('Authorization') {token}
  // jwt.verify(token, process.env.JWT_SECRET)
  
  // even if Bearer is present in the token it should be removed
  

  let token = req.header("Authorization");
  if (!token) {
    return res.status(401).send({ msg: "Token is not supplied" });
  }
  
  
  if (token.startsWith("Bearer ")) {
    token = token.slice(7, token.length);
  }
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    const userFromDb = await User.findOne({ username: user.username });
    if (userFromDb) {
      // console.log(userFromDb);
      req.user = String(userFromDb._id);
      next();
      
    } else {
      res.status(403).send({ msg: "Forbidden: user not present" });
    }
  } catch (error) {
    return res.status(401).send({ msg: "Invalid Token" });
  }
};