// 新建 src/components/forms/TypeSelect.tsx
import { useFormContext } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface Props {
  name: string;
  label: string;
}

export const TypeSelect = ({ name, label }: Props) => {
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
        <MenuItem value="article">Article</MenuItem>
        <MenuItem value="problem">Problem</MenuItem>
        <MenuItem value="solution">Solution</MenuItem>
        <MenuItem value="reference">Reference</MenuItem>
      </Select>
    </FormControl>
  );
};
