import { Paper } from "@mui/material";
import {
  FormProviderWrapper,
  TypeSelect,
  TagAutocomplete,
} from "@/components/forms";
import { NoteType, Tag } from "@/types/notes";
import { useData } from "@/data/DataContext";
import { z } from "zod";
import { useEffect, useContext } from "react";
import { NotebookContext } from "./NotebookContext";

export interface NoteFilterFormData {
  type: NoteType | "";
  tags: Tag[];
}

// 创建一个辅助类型来匹配 NoteType | ""
const filterFormSchema = z.object({
  type: z.string() as z.ZodType<NoteType | "">,
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
    })
  ),
});

interface NoteFilterProps {
  onFilterChange?: (
    filters: NoteFilterFormData & { notebookId: number | null }
  ) => void;
}

const NoteSelector = ({ onFilterChange }: NoteFilterProps) => {
  const { tags } = useData();
  const { selectedNotebook } = useContext(NotebookContext);

  // 初始加载标签数据
  useEffect(() => {
    tags.fetch();
  }, []);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        maxWidth: 600,
        backgroundColor: "#f9f9f9",
      }}
    >
      <FormProviderWrapper<NoteFilterFormData>
        defaultValues={{ type: "", tags: [] }}
        schema={filterFormSchema}
      >
        {({ watch, setValue }) => {
          // 分别监听表单值变化
          const type = watch("type");
          const tags = watch("tags");

          useEffect(() => {
            if (onFilterChange) {
              onFilterChange({
                type,
                tags,
                notebookId: selectedNotebook,
              });
            }
          }, [type, tags, selectedNotebook]);

          return (
            <>
              <TypeSelect />
              <TagAutocomplete
                selectedTags={tags}
                setSelectedTags={(newTags) => {
                  setValue("tags", newTags);
                }}
              />
            </>
          );
        }}
      </FormProviderWrapper>
    </Paper>
  );
};

export default NoteSelector;
