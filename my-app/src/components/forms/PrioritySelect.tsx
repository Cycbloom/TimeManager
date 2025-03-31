// src/components/forms/PrioritySelect.tsx
import GenericSelect from "./GenericSelect";
import { JSX } from "react";
import { priorityOptions } from "@/types/tasks";
import { Chip, Box } from "@mui/material";
import { PriorityHigh, Schedule, LowPriority } from "@mui/icons-material";

type PriorityKey = "high" | "medium" | "low";
// 增强的优先级选项配置
const priorityConfig = {
  high: {
    color: "#ff4444",
    icon: <PriorityHigh fontSize="small" />,
    label: "紧急优先",
  },
  medium: {
    color: "#ffb74d",
    icon: <Schedule fontSize="small" />,
    label: "常规处理",
  },
  low: {
    color: "#4caf50",
    icon: <LowPriority fontSize="small" />,
    label: "后台任务",
  },
} satisfies Record<
  PriorityKey,
  { color: string; icon: JSX.Element; label: string }
>;

const PrioritySelect = () => (
  <GenericSelect
    name="priority"
    label="任务优先级"
    options={priorityOptions.map((opt) => {
      const priorityKey = opt.value as PriorityKey;
      return {
        ...opt,
        label: (
          <Box display="flex" alignItems="center" gap={1}>
            <Chip
              icon={priorityConfig[priorityKey].icon}
              label={priorityConfig[priorityKey].label}
              style={{
                backgroundColor: priorityConfig[priorityKey].color + "22",
                border: `1px solid ${priorityConfig[priorityKey].color}`,
              }}
            />
          </Box>
        ),
        value: opt.value,
      };
    })}
  />
);

export default PrioritySelect;
