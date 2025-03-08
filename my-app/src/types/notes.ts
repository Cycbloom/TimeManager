// src/types/notes.ts
import { z } from "zod";

// 核心笔记类型
export interface Note {
  id: number;
  title: string;
  content: string;
  type: NoteType;
  tags: string[];
  notebook_id: number | null;
  created_at?: string;
  updated_at?: string;
}

// 笔记本类型
export interface Notebook {
  id: number;
  name: string;
  created_at?: string;
  updated_at?: string;
  note_count?: number; // 用于关联查询
}

// 标签类型
export interface Tag {
  id: number;
  name: string;
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
export interface NoteQuery {
  queryType: NoteType | null;
  queryTags: number[];
  queryNotebook: number | null;
}

// 通用响应类型
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  count?: number;
}
