// src/components/forms/TagAutocomplete.tsx
import { Autocomplete, TextField, Chip, IconButton, Box } from "@mui/material";
import { useData } from "@/data/DataContext";
import { Tag } from "@/types/notes";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useFormContext } from "react-hook-form";

interface TagAutocompleteProps {
  name?: string;
  placeholder?: string;
}

const TagAutocomplete = ({
  name = "tags",
  placeholder = "选择或输入标签",
}: TagAutocompleteProps) => {
  const { tags } = useData();
  const { setValue, watch } = useFormContext();
  const selectedTags = watch(name) || [];

  const handleRefreshTag = () => {
    setValue(name, []); // 清空已选择的标签
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
          // 过滤掉重复的标签
          const uniqueTags = newValue.filter(
            (tag, index, self) =>
              index ===
              self.findIndex(
                (t) => t.name.toLowerCase() === tag.name.toLowerCase()
              )
          );
          setValue(name, uniqueTags);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            const inputValue = (event.target as HTMLInputElement).value;
            if (!inputValue) return; // 如果输入为空

            const firstOption = tags.data.find((option) =>
              option.name.toLowerCase().includes(inputValue.toLowerCase())
            );

            if (firstOption) {
              // 检查是否已经存在相同的标签
              const isDuplicate = selectedTags.some(
                (tag: Tag) =>
                  tag.name.toLowerCase() === firstOption.name.toLowerCase()
              );

              if (!isDuplicate) {
                event.preventDefault();
                const newValue = [...selectedTags, firstOption];
                setValue(name, newValue);
              }
            }
          }
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

export default TagAutocomplete;
