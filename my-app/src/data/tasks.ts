// src/data/tasks.ts
import { createDataSlice } from "./DataSlice";
import { Task, TaskQuery, TaskStatus } from "@/types/tasks";
import apiClient from "../services/api-client";

export function createTasksSlice() {
  const baseSlice = createDataSlice<Task, TaskQuery>({
    endpoint: "/api/tasks",
  });

  // 添加任务状态流转方法
  const updateStatus = async (taskId: number, newStatus: TaskStatus) => {
    try {
      await apiClient.patch(`/api/tasks/${taskId}/status`, {
        status: newStatus,
      });
      baseSlice._setData((prev) =>
        prev.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    } catch (error) {
      baseSlice._setError(
        error instanceof Error ? error.message : "状态更新失败"
      );
    }
  };

  // TODO:添加调度相关方法
  const recalculatePriority = async (taskId: number) => {
    try {
      const response = await apiClient.post<Task>(
        `/api/tasks/${taskId}/recalculate-priority`
      );
      baseSlice._setData((prev) =>
        prev.map((task) => (task.id === taskId ? response.data : task))
      );
    } catch (error) {
      baseSlice._setError(
        error instanceof Error ? error.message : "优先级计算失败"
      );
    }
  };

  return {
    ...baseSlice,
    updateStatus,
    recalculatePriority,
  };
}

export type TasksSlice = Omit<
  ReturnType<typeof createTasksSlice>,
  "_setData" | "_setError"
>;
