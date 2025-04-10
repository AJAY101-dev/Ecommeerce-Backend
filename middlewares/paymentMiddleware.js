const Employee = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = "abcde12345";


const paymentMiddleware = (req, res, next) => {
  try {

    console.log(" payment middleware is running ")
    const token = req.headers["authorization"];
    if (!token) {
      return res.status(401).json({
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
          message: (err.message),
        });
      }
      req.customerId = decoded.customerId
      // console.log(" HELLOO ")
      console.log(" it it decoded customer id ",decoded.customerId);
     if (decoded.customerId)
     {
        next();
     }else
     {
return res.status(403).json({message:"customer not found ..."})
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

module.exports = paymentMiddleware;
