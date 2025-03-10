// // src/components/NoteLists/TagSelector.tsx
// import { useContext } from "react";
// import { FormControl, FormLabel } from "@mui/material";
// import { NoteFilterContext } from "./NotebookContext";
// import { TagAutocomplete } from "../forms/TagAutocomplete";
// import React from "react";

// /**
//  * @deprecated This component is no longer recommended for use.
//  */
// function TagSelector() {
//   const { selectedTags, setSelectedTags } = useContext(NoteFilterContext);

//   return (
//     <FormControl component="fieldset" fullWidth>
//       <FormLabel
//         component="legend"
//         sx={{ fontWeight: "bold", marginBottom: 1 }}
//       >
//         按标签筛选
//       </FormLabel>
//       <TagAutocomplete
//         selectedTags={selectedTags}
//         setSelectedTags={setSelectedTags}
//       />
//     </FormControl>
//   );
// }

// export default TagSelector;
