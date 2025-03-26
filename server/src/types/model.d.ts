export interface QueryParams {
  page?: number;
  limit?: number;
  orderBy?: string;
  [key: string]: any;
}

export interface CreateData {
  [key: string]: any;
}

export interface UpdateData {
  [key: string]: any;
}
