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
  // 选择的标签
  const { selectedTags, setSelectedTags, tagsDirty, setTagsDirty } =
    useContext(NoteFilterContext);
  // 标签选项
  const { data: tagOptions } = useTags(tagsDirty, setTagsDirty);

  return (
    <>
      {/* 标签筛选 */}
      <FormControl component="fieldset" fullWidth>
        <FormLabel
          component="legend"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          按标签筛选
        </FormLabel>
        <Autocomplete
          multiple // 允许选择多个标签
          options={tagOptions}
          getOptionLabel={(option) => option.name} // 显示标签的名字
          value={selectedTags}
          onChange={(_event, newValue) => {
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
            value.map((option, index) => {
              const { key, ...otherProps } = getTagProps({ index }); // 提取 key 和其他属性
              return <Chip key={key} label={option.name} {...otherProps} />;
            })
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
