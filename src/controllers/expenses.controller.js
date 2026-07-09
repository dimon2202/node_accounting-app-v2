const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const { userId, from, to, categories } = req.query;
  const expenses = await expensesService.getAll(userId, from, to, categories);

  res.json(expenses);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const existingUser = await usersService.getById(userId);

  if (!userId || !existingUser) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.create(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).json(expense);
};

const getById = async (req, res) => {
  const expense = await expensesService.getById(+req.params.id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expense);
};

const update = async (req, res) => {
  const idExpense = Number(req.params.id);
  const expense = await expensesService.getById(idExpense);
  const { spentAt, title, amount, category, note } = req.body;

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.update({
    id: idExpense,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.json(updatedExpense);
};

const deleteById = async (req, res) => {
  const expepse = await expensesService.getById(+req.params.id);

  if (!expepse) {
    return res.sendStatus(404);
  }

  await expensesService.deleteById(expepse.id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteById,
};
