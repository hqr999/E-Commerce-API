const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    console.log("error, sem token");
  } else {
    console.log("Token está presente");
  }
  next();
};

module.exports = {
  authenticateUser,
};
