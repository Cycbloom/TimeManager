import { GenericSelect } from "./GenericSelect";
import { statusOptions } from "@/types/tasks";

export const StatusSelect = () => {
  return <GenericSelect name="status" label="状态" options={statusOptions} />;
};
