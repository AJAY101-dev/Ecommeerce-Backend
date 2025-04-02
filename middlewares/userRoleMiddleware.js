const Employee = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "abcde12345";


const userRoleMiddleware = (req, res, next) => {
  try {
    const token = req.headers["authorization"];
    if (!token) {
      return req.status(401).json({
        statusCode: 401,
        message: " token not found ..",
      });
    }
    console.log(token);        // gives output as in bearer jkasbdsiudweuowf98532hg2t23u79hg98h3d2h08odh38d
    const newToken = token.split(" ")[1];

    jwt.verify(newToken, secretKey, (err, decoded) => {
      if (err) {
        return res.status(401).json({
          statusCode: 401,
          message: "some error occured ..",
        });
      }
      req.role = decoded.role
      // console.log(" HELLOO ")
      console.log(decoded.role)
     if (req.role=="user")
     {
        next();
     }else
     {
return res.status(403).json({message:"access denied for you !! you are not user "})
     }
    });
  } catch (error) {
    res.status(401).json({
      statusCode: 401,
      message: error.message,
    });
  }

  console.log(" token validation done successfully ....");
};

module.exports = userRoleMiddleware;
