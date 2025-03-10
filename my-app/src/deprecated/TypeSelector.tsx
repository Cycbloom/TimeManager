// // 导入必要的组件
// import {
//   FormControl,
//   FormLabel,
//   Select,
//   MenuItem,
//   InputLabel,
//   SelectChangeEvent,
// } from "@mui/material";
// import { useContext } from "react";
// import { NoteFilterContext } from "./NotebookContext";

// // 定义类型选项的数据结构
// import { NoteType, noteTypeOptions } from "../../types/notes";

// // 类型筛选组件
// const TypeSelector = () => {
//   // 当前选中的类型
//   const { selectedType, setSelectedType } = useContext(NoteFilterContext);

//   // 处理类型选择变化
//   const handleTypeChange = (event: SelectChangeEvent<NoteType>) => {
//     setSelectedType(event.target.value as NoteType);
//   };

//   // 添加清空选项
//   const optionsWithAll = ["", ...noteTypeOptions];

//   return (
//     <>
//       <FormControl component="fieldset" fullWidth>
//         <FormLabel
//           component="legend"
//           sx={{ fontWeight: "bold", marginBottom: 1 }}
//         >
//           按类型筛选
//         </FormLabel>
//         <FormControl fullWidth variant="outlined">
//           <InputLabel id="type-select-label">Type</InputLabel>
//           <Select
//             labelId="type-select-label"
//             value={selectedType || ""}
//             onChange={handleTypeChange}
//             label="Type"
//           >
//             {optionsWithAll.map((option) => (
//               <MenuItem key={option || "all"} value={option}>
//                 {option === "" ? "all" : option}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>
//       </FormControl>
//       {/* <Typography>当前选中的类型: {selectedType}</Typography> */}
//     </>
//   );
// };

// export default TypeSelector;
