const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const getById = async (req, res) => {
  const userId = Number(req.params.id);

  if (!userId) {
    return res.status(400);
  }

  const user = await usersService.getById(userId);

  if (!user) {
    return res.status(404);
  }

  return res.status(200).json(user);
};

const deleteOne = async (req, res) => {
  const user = await usersService.getById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(user.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const name = req.body.name;
  const user = await usersService.getById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update(user.id, name);

  res.json(updatedUser);
};

module.exports = {
  getAll,
  create,
  getById,
  deleteOne,
  update,
};
