const express = require("express");
const router = express.Router();
const tagController = require("../controller/tagController");

// 获取所有标签
router.get("/", tagController.getAllTags);

// 获取指定标签
router.get("/:id", tagController.getTagById);

// 创建新标签
router.post("/", tagController.createTag);

// 更新标签
router.put("/:id", tagController.updateTag);

// 删除标签
router.delete("/:id", tagController.deleteTag);

module.exports = router;
