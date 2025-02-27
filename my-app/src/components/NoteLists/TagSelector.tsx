import { useState, useEffect, useContext } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  Paper,
  Typography,
  FormControl,
  FormLabel,
} from "@mui/material";
import { NoteFilterContext } from "./NoteFilterContext";

import { Tag } from "./NoteFilterContext";

// 模拟从数据库获取标签数据（仅包含 id 和 name）
const fetchTagsFromDatabase = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { id: 1, name: "工作" },
        { id: 2, name: "学习" },
        { id: 3, name: "生活" },
        { id: 4, name: "旅行" },
      ]);
    }, 1000); // 模拟异步请求
  });
};

function TagSelector() {
  // 标签选项
  const [tagOptions, setTagOptions] = useState<Tag[]>([]);

  // 选择的标签
  const { selectedTags, setSelectedTags } = useContext(NoteFilterContext);

  // 加载标签数据
  useEffect(() => {
    const loadTags = async () => {
      const tags = (await fetchTagsFromDatabase()) as Tag[];
      setTagOptions(tags);
    };
    loadTags();
  }, []);

  return (
    <>
      {/* 标签筛选 */}
      <FormControl component="fieldset" fullWidth>
        <FormLabel
          component="legend"
          sx={{ fontWeight: "bold", marginBottom: 2 }}
        >
          按标签筛选
        </FormLabel>
        <Autocomplete
          multiple // 允许选择多个标签
          options={tagOptions}
          getOptionLabel={(option) => option.name} // 显示标签的名字
          value={selectedTags}
          onChange={(event, newValue) => {
            setSelectedTags(newValue); // 更新选中的标签
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="选择或输入标签"
            />
          )}
          renderTags={(value, getTagProps) =>
            value.map((option, index) => (
              <Chip label={option.name} {...getTagProps({ index })} />
            ))
          }
        />
      </FormControl>

      {/* 调试信息 */}
      {/* <Typography variant="caption" sx={{ display: "block", marginTop: 2 }}>
        当前选中的标签：
        <strong>{selectedTags.map((tag) => tag.name).join(", ")}</strong>
      </Typography> */}
    </>
  );
}

export default TagSelector;
