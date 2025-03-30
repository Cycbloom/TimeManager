// src/components/forms/TagAutocomplete.tsx
import { Autocomplete, TextField, Chip, IconButton, Box } from "@mui/material";
import { useData } from "@/data/DataContext";
import { Tag } from "@/types/notes";
import RefreshIcon from "@mui/icons-material/Refresh";

interface TagAutocompleteProps {
  selectedTags: Tag[];
  setSelectedTags: (tags: Tag[]) => void;
  placeholder?: string;
}

export const TagAutocomplete = ({
  selectedTags,
  setSelectedTags,
  placeholder = "选择或输入标签",
}: TagAutocompleteProps) => {
  const { tags } = useData();

  const handleRefreshTag = () => {
    setSelectedTags([]); // 清空已选择的标签
    tags.refresh(); // 重新获取标签数据
  };

  return (
    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
      <Autocomplete
        multiple
        options={tags.data}
        getOptionLabel={(option) => option.name}
        value={selectedTags}
        onChange={(_event, newValue) => {
          setSelectedTags(newValue);
        }}
        renderInput={(params) => (
          <TextField {...params} variant="outlined" placeholder={placeholder} />
        )}
        renderTags={(value, getTagProps) =>
          value.map((option, index) => {
            const { key, ...otherProps } = getTagProps({ index });
            return <Chip key={key} label={option.name} {...otherProps} />;
          })
        }
        sx={{ flex: 1 }}
      />
      <IconButton onClick={handleRefreshTag} size="small">
        <RefreshIcon />
      </IconButton>
    </Box>
  );
};
