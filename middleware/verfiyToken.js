export const verifyToken = (req, res, next) => {
  const token = req.cookies["auth-token"];

  if (!token) return res.status(401).json({ message: "Unauthorized User" });

  next();
};
