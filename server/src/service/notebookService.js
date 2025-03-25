const Notebook = require("../model/notebookModel");

module.exports = {
  getAllNotebooks: async (query = {}) => {
    return await Notebook.find(query);
  },
  createNotebook: async (name) => {
    return await Notebook.create(name);
  },
  updateNotebook: async (id, name) => {
    return await Notebook.update(id, name);
  },
  deleteNotebook: async (id) => {
    return await Notebook.delete(id);
  },
  getNotebookById: async (id) => {
    return await Notebook.find({ id }).then((rows) => rows[0]);
  },
  renameNotebook: async (id, name) => {
    return await Notebook.update(id, name);
  },
};
