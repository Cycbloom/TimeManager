export interface QueryParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  [key: string]: any;
}

// 创建数据接口，必须通过泛型参数指定具体模型类型
export type CreateData<T> = {
  [P in keyof T as T[P] extends { _brand?: any } ? never : P]: T[P];
  // } & {
  //   [key: string]: any;
};

export type RemoveBrand<T> = {
  [K in keyof T]: T[K] extends { _brand: string; value: infer U } ? U : T[K];
};

// 更新数据接口，所有字段都是可选的
export type UpdateData<T> = {
  [P in keyof T as T[P] extends { _brand?: any } ? never : P]?: T[P];
  // } & {
  //   [key: string]: any;
};
