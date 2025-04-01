//  src/types/tasks.ts
import { z } from "zod";
import { SelectOption } from "@/components/forms/GenericSelect";
import { QueryParams } from "./model";

export const taskFormSchema = z.object({
  title: z.string().min(1, "标题不能为空"),
  description: z.string().min(1, "描述不能为空"),
  dueDate: z.date(),
  priority: z.enum(["low", "medium", "high"]),
  tags: z.array(z.string()),
  estimatedHours: z
    .number({
      required_error: "必填项",
      invalid_type_error: "必须输入数字",
    })
    .min(1, "请输入数字"),
});

export type TaskFormData = z.infer<typeof taskFormSchema>;

export interface Task extends TaskFormData {
  id: string;
  bufferTime: number;
  status: "created" | "ready" | "executing" | "completed";
  storagePath?: string;
}

export type TaskStatus = Task["status"];

export const statusOptions: SelectOption[] = [
  { value: "created", label: "已创建" },
  { value: "ready", label: "就绪" },
  { value: "executing", label: "执行中" },
  { value: "completed", label: "已完成" },
];

export interface TaskQuery extends QueryParams {
  status?: TaskStatus;
  priority?: string;
  dueDateRange?: [Date, Date];
}

// src/types/tasks.ts
export const priorityOptions: SelectOption[] = [
  { value: "low", label: "低" },
  { value: "medium", label: "中" },
  { value: "high", label: "高" },
];
