import { INotebook } from "./notebook";

export interface IField {
  type: string;
  primaryKey?: boolean;
  notNull?: boolean;
  default?: string;
}

export interface ISchema<T = any> {
  tableName: string;
  fields: Record<keyof T, IField>;
}

export interface ISchemaMap {
  notebooks: ISchema<INotebook>;
}
