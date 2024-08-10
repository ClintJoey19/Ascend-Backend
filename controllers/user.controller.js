export const getUsers = (req, res) => {
  // get users
};

export const getUser = (req, res) => {
  // get user
};

export const addUser = (req, res) => {
  // add user
};

export const updateUser = (req, res) => {
  // update user here
  console.log(req.body);

  res.send({ message: "Success" });
};

export const deleteUser = (req, res) => {
  // delete user
};
