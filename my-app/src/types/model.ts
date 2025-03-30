// 查询参数类型
export interface QueryParams {
  orderBy?: string;
  page?: number;
  limit?: number;
}

// 基础类型定义
export interface BaseEntity {
  id: number | string;
  created_at?: Date;
  updated_at?: Date;
}
