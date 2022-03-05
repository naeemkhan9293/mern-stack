const jwt = require("jsonwebtoken");
const SECRET_KEY = "kjdfljlsdfjsldfsdlfjsdlkfjklsdfjdklfjlksf$5";

const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ error: "Access denied invalid authentication" });
  }
  try {
    const data = jwt.verify(token, SECRET_KEY);
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Access denied invalid authentication" });
  }
};
module.exports = fetchUser;
