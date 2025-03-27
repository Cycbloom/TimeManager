import { INotebook } from "./notebook";
import { ITag } from "./tag";

export interface IField {
  type: string;
  primaryKey?: boolean;
  notNull?: boolean;
  default?: string;
  foreignKey?: {
    table: string;
    field: string;
  };
}

export interface ISchema<T = any> {
  tableName: string;
  fields: Record<keyof T, IField>;
}

export interface ISchemaMap {
  notebooks: ISchema<INotebook>;
  tags: ISchema<ITag>;
}
