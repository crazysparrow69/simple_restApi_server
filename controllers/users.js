const data = {
  users: require('../models/usersDB.json'),
  setUsers: function(data) { this.users = data },
};

const getAllUsers = (req, res) => {
  res.json(data.users);
};

const createUser = (req, res) => {
  if (!req.body.firstname || !req.body.lastname) return res.status(400).json({ "error": "User requires name and lastname" });

  const newUser = {
    id: data.users.length + 1,
    firstname: req.body.firstname,
    lastname: req.body.lastname
  };

  data.setUsers([ ...data.users, newUser]);

  res.status(201).json(data.users);
};

const updateUser = (req, res) => {
  const foundUser = data.users.find(user => req.body.id === user.id);

  if (!foundUser) return res.status(400).json({ "error": `User ID ${req.params.id} not found` });

  if (req.body.firstname) foundUser.firstname = req.body.firstname;
  if (req.body.lastname) foundUser.lastname = req.body.lastname;

  const arr = [ ...data.users.filter(user => req.body.id !== user.id), foundUser ].sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0);
  data.setUsers(arr);

  res.json(data.users);
};

const deleteUser = (req, res) => {
  if (!req.body.id) return res.status(400).json({ "error": "User requires id" });

  const arr = data.users.filter(user => req.body.id !== user.id);
  data.setUsers(arr);

  res.json(data.users);
};

const getUser = (req, res) => {
  const foundUser = data.users.find(user => user.id === parseInt(req.params.id));
  if (!foundUser) return res.status(400).json({ "message": `User ID ${req.params.id} not found` });
  
  res.json(foundUser);
};


module.exports = { 
  getAllUsers,
  createUser,
  updateUser,
  deleteUser,
  getUser
};