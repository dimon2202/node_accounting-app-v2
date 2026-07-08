let expenseIdCounter = 1;
let expenses = [];

const setInitExpanses = () => {
  expenses = [];
};

const getAll = () => {
  return expenses;
};

const create = (userId, spentAt, title, amount, category, note) => {
  const expense = {
    id: expenseIdCounter++,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  expenses.push(expense);

  return expense;
};

const getById = (id) => {
  return expenses.find((expense) => expense.id === +id);
};

const update = () => {};

const deleteById = (id) => {
  const index = expenses.findIndex((i) => i.id === +id);

  if (index === -1) {
    return;
  }

  const [expense] = expenses.splice(index, 1);

  return expense;
};

module.exports = {
  getAll,
  create,
  getById,
  update,
  deleteById,
  setInitExpanses,
};
