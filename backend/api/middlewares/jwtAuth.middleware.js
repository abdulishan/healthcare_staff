const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  console.log(authHeader)
  const token = authHeader && authHeader.split(' ')?.[1];

  if (!token) {
    return res.status(401).json({
      statusCode: 401,
      message: "Token is missing, Authorization is denied."
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN_KEY);
    req.userToken = decoded;
    next();
  } catch (error) {
    return res.status(400).json({
      statusCode: 400,
      message: "Invalid Token"
    })
  }
}

module.exports = authMiddleware;