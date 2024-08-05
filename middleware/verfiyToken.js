import jwt from "jsonwebtoken";

export const verifyToken = (req, res) => {
  const token = req.cookies;
  console.log(token);
};
