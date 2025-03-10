// src/components/forms/TagAutocomplete.tsx
import { Autocomplete, TextField, Chip } from "@mui/material";
import { useData } from "@/data/DataContext";
import { Tag } from "@/types/notes";

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

  return (
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
    />
  );
};
