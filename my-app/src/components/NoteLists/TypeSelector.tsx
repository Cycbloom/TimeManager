// 导入必要的组件
import { FormControl, FormLabel, Autocomplete, TextField } from "@mui/material";
import { useContext } from "react";
import { NoteFilterContext } from "./NoteFilterContext";

// 定义类型选项的数据结构
import { NoteType, typeOptions } from "./BaseNoteForm";

// 类型筛选组件
const TypeSelector = () => {
  // 当前选中的类型
  const { selectedType, setSelectedType } = useContext(NoteFilterContext);

  // 处理类型选择变化
  const handleTypeChange = (
    event: React.ChangeEvent<{}>,
    newValue: NoteType | null
  ) => {
    setSelectedType(newValue);
  };

  return (
    <>
      <FormControl component="fieldset" fullWidth>
        <FormLabel
          component="legend"
          sx={{ fontWeight: "bold", marginBottom: 1 }}
        >
          按类型筛选
        </FormLabel>
        <Autocomplete
          options={typeOptions}
          getOptionLabel={(option) => option}
          value={selectedType}
          onChange={handleTypeChange}
          renderInput={(params) => (
            <TextField
              {...params}
              variant="outlined"
              placeholder="请选择类型"
            />
          )}
        />
      </FormControl>
      {/* <Typography>当前选中的类型: {selectedType?.label}</Typography> */}
    </>
  );
};

export default TypeSelector;
