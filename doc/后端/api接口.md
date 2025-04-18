后端需要提供以下服务和 API 接口：

### 服务概述

1. **笔记本管理**：提供对笔记本的增删改查功能。
2. **笔记管理**：提供对笔记的增删改查功能，并支持笔记的移动。
3. **标签管理**：提供获取所有标签的功能。
4. **任务管理**：提供对任务的增删改查功能，并支持任务状态更新和优先级重新计算。

### API 接口

#### 笔记本管理

- **获取所有笔记本**

  - **方法**: `GET`
  - **路径**: `/api/notebooks`
  - **功能**: 获取所有笔记本的列表。

- **获取指定笔记本**

  - **方法**: `GET`
  - **路径**: `/api/notebooks/:id`
  - **功能**: 根据 ID 获取特定笔记本的信息。

- **创建新笔记本**

  - **方法**: `POST`
  - **路径**: `/api/notebooks`
  - **功能**: 创建一个新的笔记本。

- **更新笔记本**

  - **方法**: `PUT`
  - **路径**: `/api/notebooks/:id`
  - **功能**: 更新指定 ID 的笔记本信息。

- **删除笔记本**

  - **方法**: `DELETE`
  - **路径**: `/api/notebooks/:id`
  - **功能**: 删除指定 ID 的笔记本。

- **重命名笔记本**
  - **方法**: `PATCH`
  - **路径**: `/api/notebooks/:id/rename`
  - **功能**: 重命名指定 ID 的笔记本。

#### 笔记管理

- **获取所有笔记**

  - **方法**: `GET`
  - **路径**: `/api/notes`
  - **功能**: 获取所有笔记的列表。

- **获取指定笔记**

  - **方法**: `GET`
  - **路径**: `/api/notes/:id`
  - **功能**: 根据 ID 获取特定笔记的信息。

- **创建新笔记**

  - **方法**: `POST`
  - **路径**: `/api/notes`
  - **功能**: 创建一个新的笔记。

- **更新笔记**

  - **方法**: `PUT`
  - **路径**: `/api/notes/:id`
  - **功能**: 更新指定 ID 的笔记信息。

- **删除笔记**

  - **方法**: `DELETE`
  - **路径**: `/api/notes/:id`
  - **功能**: 删除指定 ID 的笔记。

- **移动笔记到另一个笔记本**
  - **方法**: `PATCH`
  - **路径**: `/api/notes/:id/notebook`
  - **功能**: 将指定 ID 的笔记移动到另一个笔记本。

#### 标签管理

- **获取所有标签**
  - **方法**: `GET`
  - **路径**: `/api/tags`
  - **功能**: 获取所有标签的列表。

#### 任务管理

- **获取所有任务**

  - **方法**: `GET`
  - **路径**: `/api/tasks`
  - **功能**: 获取所有任务的列表。

- **创建新任务**

  - **方法**: `POST`
  - **路径**: `/api/tasks`
  - **功能**: 创建一个新的任务。

- **获取指定任务**

  - **方法**: `GET`
  - **路径**: `/api/tasks/:taskId`
  - **功能**: 根据 ID 获取特定任务的信息。

- **更新任务**

  - **方法**: `PUT`
  - **路径**: `/api/tasks/:taskId`
  - **功能**: 更新指定 ID 的任务信息。

- **删除任务**

  - **方法**: `DELETE`
  - **路径**: `/api/tasks/:taskId`
  - **功能**: 删除指定 ID 的任务。

- **更新任务状态**

  - **方法**: `PATCH`
  - **路径**: `/api/tasks/:taskId/status`
  - **功能**: 更新指定 ID 的任务状态。

- **重新计算任务优先级**
  - **方法**: `POST`
  - **路径**: `/api/tasks/:taskId/recalculate-priority`
  - **功能**: 重新计算指定 ID 的任务优先级。

这些 API 接口提供了对笔记本、笔记、标签和任务的全面管理功能。
