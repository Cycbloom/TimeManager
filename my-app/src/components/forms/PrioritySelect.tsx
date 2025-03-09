// src/components/forms/PrioritySelect.tsx
import { GenericSelect } from "./GenericSelect";
import { priorityOptions } from "@/types/tasks";

export const PrioritySelect = () => (
  <GenericSelect name="priority" label="优先级" options={priorityOptions} />
);
