function userRegisterMiddleware(req, res, next) {
  const { name, email, password, role } = req.body;
  const url = req.originalUrl;
  if (
    (url.includes("register") && (!name || !email || !password || !role)) ||
    (url.includes("/login") && (!email || !password))
  ) {
    res.status(404).json({ message: "Missing information" });
  } else {
    next();
  }
}

module.exports = userRegisterMiddleware;
