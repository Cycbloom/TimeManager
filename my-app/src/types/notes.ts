// src/types/notes.ts
import { z } from "zod";
import { SelectOption } from "../components/forms/GenericSelect";
import { QueryParams } from "./model";

// 核心笔记类型
export interface Note {
  id: number;
  title: string;
  content: string;
  type: NoteType;
  tags: string[];
  notebook_id: number | null;
  created_at?: Date;
  updated_at?: Date;
}

// 笔记本类型
export interface Notebook {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
  note_count?: number; // 用于关联查询
}

// 标签类型
export interface Tag {
  id: number;
  name: string;
  created_at?: Date;
  updated_at?: Date;
}

// Zod 相关类型定义
export const noteTypeEnum = z.enum([
  "article",
  "problem",
  "solution",
  "reference",
]);
export type NoteType = z.infer<typeof noteTypeEnum>;
export const noteTypeOptions = noteTypeEnum.options;

export const noteFormSchema = z.object({
  title: z.string().min(1, "标题不能为空"),
  content: z.string().min(1, "内容不能为空"),
  type: noteTypeEnum,
  tags: z.array(z.string()),
});
export type NoteFormData = z.infer<typeof noteFormSchema>;

// 笔记查询参数
export interface NoteQuery extends QueryParams {
  type?: NoteType | null;
  tags?: string[];
  notebook_id?: number | null;
}

// 通用响应类型
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  count?: number;
}

export const noteTypeOptionsVer2: SelectOption[] = [
  { value: "article", label: "文章" },
  { value: "problem", label: "问题" },
  { value: "solution", label: "解决方案" },
  { value: "reference", label: "参考资料" },
];
