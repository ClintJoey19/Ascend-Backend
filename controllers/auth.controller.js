import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import prisma from "../lib/prisma.js";

export const register = async (req, res) => {
  try {
    // register user to the db
    const { firstname, lastname, email, password } = req.body;

    // hash the password
    const hashPassword = await bcrypt.hash(password, 10);

    // create a new user and save to db
    const newUser = await prisma.user.create({
      data: {
        firstname,
        lastname,
        email,
        password: hashPassword,
        role: "user",
      },
    });

    if (!newUser)
      return res.status(500).json({ message: "Failed to register" });

    res.send({ message: "Registration is Successful" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Failed to register");
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if user exists
    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    // check if password matched
    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched)
      return res.status(401).json({ message: "Invalid Credentials" });

    // generate jwt token
    const age = 1000 * 60 * 60 * 24 * 7;

    const token = jwt.sign(
      {
        id: user.id,
        role: user.role,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: age }
    );

    // generate user cookie
    const { password: userPassword, ...userInfo } = user;
    res
      .cookie("auth-token", token, {
        httpOnly: true,
        // secure: true,
        maxAge: age,
      })
      .status(200)
      .json(userInfo);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Failed to login");
  }
};

export const logout = (req, res) => {
  res
    .clearCookie("auth-token")
    .status(200)
    .json({ message: "Logout Successful" });
};
