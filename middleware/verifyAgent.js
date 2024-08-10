import jwt from "jsonwebtoken";

export const verifyAgent = (req, res, next) => {
  const token = req.cookies["auth-token"];
  const user = jwt.verify(token, process.env.JWT_SECRET_KEY);

  if (user.role !== "agent")
    return res.status(401).json({ message: "Unauthorized User" });

  next();
};
