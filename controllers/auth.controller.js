import bcrypt from "bcrypt";
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
    console.log(newUser);

    res.send({ message: "Registration is Successful" });
  } catch (error) {
    console.error(error.message);
  }
};

export const login = (req, res) => {
  // login user
};

export const logout = (req, res) => {
  // logout user
};
