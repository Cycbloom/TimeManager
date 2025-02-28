import { useContext } from "react";
import {
  Autocomplete,
  TextField,
  Chip,
  FormControl,
  FormLabel,
} from "@mui/material";
import { NoteFilterContext } from "./NoteFilterContext";

import useTags from "../../hooks/useTags";

function TagSelector() {
  // 标签选项
  const { data: tagOptions } = useTags();

  // 选择的标签
  const { selectedTags, setSelectedTags } = useContext(NoteFilterContext);

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
