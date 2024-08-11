import prisma from "../lib/prisma.js";

export const getUsers = (req, res) => {
  // get users
};

export const getUser = (req, res) => {
  // get user
};

export const addUser = (req, res) => {
  // add user
};

export const updateUser = async (req, res) => {
  // update user here
  const { id, firstname, lastname, email, profileImg } = req.body;

  try {
    const user = await prisma.user.update({
      where: {
        id,
      },
      data: {
        firstname,
        lastname,
        email,
        profileImg,
      },
    });

    if (!user) return res.status(500).json("Error updating user");

    res.status(201).json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).json("Error updating user");
  }
};

export const deleteUser = (req, res) => {
  // delete user
};
