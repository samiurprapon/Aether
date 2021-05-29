const jwt = require("jsonwebtoken");

const config = require('../config/databaseSecrets.json');


// check refresh token is valid or not
const authentication = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send();
  }


  jwt.verify(token, process.env.REFRESH_TOKEN_SECRET || config.REFRESH_TOKEN_SECRET , (err, user) => {

    if (err) {
      console.log(err);
      return res.status(403).send();
    }

    res.locals.user = user;
    res.locals.refreshToken = token;

    next();
  });
};

// check acces token is valid or not
const validation = (req, res, next) => {
  
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).send();
  }

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || config.ACCESS_TOKEN_SECRET, (err, details) => { 
    if(err) {
      return res.status(403).send();
    }

    res.locals.user = details;

    next();
  });
}


module.exports = {
  authentication,
  validation
};

