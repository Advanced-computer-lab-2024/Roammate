const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const token = req.cookies.token;
  //store current url to redirect to it after login
  const currentUrl = req.originalUrl;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        res.status(401).send("Token verification failed");
      } else {
        //console.log(decodedToken);
        req.userId = decodedToken.id;
        next();
      }
    });
  } else {
    res.status(401).send("Unauthorized. Please login first");
  }
};

module.exports = { requireAuth };
