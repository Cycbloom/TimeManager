import { Paper } from "@mui/material";
import { TypeSelect, TagAutocomplete } from "@/components/form-controls";
import { NoteType, Tag } from "@/types/notes";
import { useData } from "@/data/DataContext";
import { z } from "zod";
import { useEffect, useContext, useState } from "react";
import { NotebookContext } from "../NotebookContext";
import BaseForm from "@/components/forms/BaseForm";

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

interface Props {
  onFilterChange?: (
    filters: NoteFilterFormData & { notebookId: number | null }
  ) => void;
}

const NoteSelector = ({ onFilterChange }: Props) => {
  const { tags } = useData();
  const { selectedNotebook } = useContext(NotebookContext);
  const [formData, setFormData] = useState<NoteFilterFormData>({
    type: "",
    tags: [],
  });

  // 初始加载标签数据
  useEffect(() => {
    tags.fetch();
  }, []);

  // 监听表单数据和 selectedNotebook 的变化
  useEffect(() => {
    onFilterChange?.({ ...formData, notebookId: selectedNotebook });
  }, [formData, selectedNotebook]);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 3,
        maxWidth: 600,
        backgroundColor: "#f9f9f9",
      }}
    >
      <BaseForm<NoteFilterFormData>
        defaultValues={{ type: "", tags: [] }}
        schema={filterFormSchema}
        onSubmit={(data) =>
          onFilterChange?.({ ...data, notebookId: selectedNotebook })
        }
        onFormDataChange={setFormData}
        formTitle="笔记筛选"
        resetAfterSubmit={false}
      >
        <TypeSelect name="type" label="笔记类型" />
        <TagAutocomplete name="tags" placeholder="选择或输入标签" />
      </BaseForm>
    </Paper>
  );
};

export default NoteSelector;
