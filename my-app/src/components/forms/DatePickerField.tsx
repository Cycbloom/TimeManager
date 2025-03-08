// src/components/forms/DatePickerField.tsx
import { useFormContext } from "react-hook-form";
import dayjs from "dayjs";
import { TextField } from "@mui/material";

interface DatePickerFieldProps {
  name: string;
  label: string;
}

export const DatePickerField = ({ name, label }: DatePickerFieldProps) => {
  const {
    watch,
    formState: { errors },
    setValue,
  } = useFormContext();

  const rawValue = watch(name);
  // 处理日期值的转换
  let formattedValue = "";
  if (rawValue) {
    const date = rawValue instanceof Date ? rawValue : new Date(rawValue);
    if (!isNaN(date.getTime())) {
      formattedValue = dayjs(date).format("YYYY-MM-DD");
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    const date = value ? new Date(value) : null;
    setValue(name, date, { shouldValidate: true });
  };

  return (
    <TextField
      label={label}
      type="date"
      variant="outlined"
      fullWidth
      margin="normal"
      onChange={handleChange}
      value={formattedValue}
      slotProps={{
        inputLabel: {
          shrink: true,
        },
        htmlInput: {
          max: dayjs().add(1, "year").format("YYYY-MM-DD"),
          min: dayjs().format("YYYY-MM-DD"),
        },
      }}
      error={!!errors[name]}
      helperText={errors[name]?.message?.toString()}
    />
  );
};
