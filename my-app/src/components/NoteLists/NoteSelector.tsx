import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Paper,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";

const typeOptions = [
  { value: "all", label: "All" },
  { value: "article", label: "笔记" },
  { value: "problem", label: "问题" },
  { value: "solution", label: "解决方案" },
  { value: "reference", label: "参考" },
];

const tagOptions = [
  { value: "work", label: "工作" },
  { value: "life", label: "生活" },
  { value: "study", label: "学习" },
  { value: "travel", label: "旅行" },
];

const NoteSelector = () => {
  const [selectedType, setSelectedType] = useState("all");
  const [selectedTags, setSelectedTags] = useState([] as string[]);

  // 处理类型筛选变化
  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedType(event.target.value);
  };

  // 处理标签筛选变化
  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSelectedTags(
      (prev) =>
        prev.includes(value)
          ? prev.filter((tag) => tag !== value) // 如果已选中，则移除
          : [...prev, value] // 如果未选中，则添加
    );
  };

  return (
    <Paper
      elevation={3}
      sx={{ padding: 3, maxWidth: 300, backgroundColor: "#f9f9f9" }}
    >
      {/* 类型筛选 */}
      <FormControl component="fieldset" sx={{ marginBottom: 3 }}>
        <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
          按类型筛选
        </FormLabel>
        <RadioGroup value={selectedType} onChange={handleTypeChange}>
          {typeOptions.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.value}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </FormControl>

      {/* 标签筛选 */}
      <FormControl component="fieldset">
        <FormLabel component="legend" sx={{ fontWeight: "bold" }}>
          按标签筛选
        </FormLabel>
        {tagOptions.map((option) => (
          <FormControlLabel
            key={option.value}
            control={
              <Checkbox
                value={option.value}
                checked={selectedTags.includes(option.value)} // 是否选中
                onChange={handleTagChange}
              />
            }
            label={option.label}
          />
        ))}
      </FormControl>

      {/* 调试信息 */}
      <Typography variant="caption" sx={{ display: "block", marginTop: 2 }}>
        当前筛选条件：
        <br />
        类型：{selectedType}
        <br />
        标签：{selectedTags.join(", ")}
      </Typography>
    </Paper>
  );
};

export default NoteSelector;
