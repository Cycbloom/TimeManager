// 新建 src/components/forms/PrioritySelect.tsx
import { useFormContext } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  name: string;
  label: string;
}

export const PrioritySelect = ({ name, label }: Props) => {
  const {
    register,
    formState: { errors },
    watch,
  } = useFormContext();

  return (
    <FormControl fullWidth margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select
        label={label}
        {...register(name)}
        value={watch(name) || ""}
        error={!!errors[name]}
      >
        <MenuItem value="low">低</MenuItem>
        <MenuItem value="medium">中</MenuItem>
        <MenuItem value="high">高</MenuItem>
      </Select>
    </FormControl>
  );
};
