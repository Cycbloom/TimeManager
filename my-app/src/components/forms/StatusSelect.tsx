import GenericSelect from "./GenericSelect";
import { statusOptions } from "@/types/tasks";

const StatusSelect = () => {
  return <GenericSelect name="status" label="状态" options={statusOptions} />;
};

export default StatusSelect;
