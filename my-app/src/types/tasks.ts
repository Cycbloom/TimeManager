//  src/types/tasks.ts
import { z } from "zod";
import { SelectOption } from "../components/forms/GenericSelect";

export const taskFormSchema = z.object({
  title: z.string().min(1, "标题不能为空"),
  descriction: z.string().min(1, "描述不能为空"),
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
  id: number;
  bufferTime: number;
  status: "created" | "ready" | "executing" | "completed";
  storagePath?: string;
}

export type TaskStatus = Task["status"];

export interface TaskQuery {
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
