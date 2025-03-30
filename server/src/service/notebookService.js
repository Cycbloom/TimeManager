const Notebook = require("../models/NotebookModel");

// 内存缓存
let notebooksCache = null;
let lastCacheTime = null;
const CACHE_TTL = 5 * 60 * 1000; // 缓存有效期5分钟

// 检查缓存是否有效
const isCacheValid = () => {
  return (
    notebooksCache && lastCacheTime && Date.now() - lastCacheTime < CACHE_TTL
  );
};

// 更新缓存
const updateCache = async (query = {}) => {
  notebooksCache = await Notebook.find(query);
  lastCacheTime = Date.now();
  return notebooksCache;
};

module.exports = {
  getAllNotebooks: async (query = {}) => {
    if (isCacheValid()) {
      return notebooksCache;
    }
    return await updateCache(query);
  },
  createNotebook: async (name) => {
    const result = await Notebook.create({ name });
    await updateCache();
    return result;
  },
  updateNotebook: async (id, name) => {
    const result = await Notebook.update(id, { name });
    await updateCache();
    return result;
  },
  deleteNotebook: async (id) => {
    const result = await Notebook.delete(id);
    await updateCache();
    return result;
  },
  getNotebookById: async (id) => {
    return await Notebook.find({ id }).then((rows) => rows[0]);
  },
  renameNotebook: async (id, name) => {
    const result = await Notebook.update(id, { name });
    await updateCache();
    return result;
  },
};
