const Notebook = require("../model/notebookModel");

module.exports = {
    getAllNotebooks: async () => {
        return await Notebook.getAll();
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
        return await Notebook.getById(id);
    },
    renameNotebook: async (id, name) => {
        return await Notebook.update(id, name);
    },
};
