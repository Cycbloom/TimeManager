export interface ITag {
  id: { _brand: "tag_id"; value: number };
  name: string;
  created_at: { _brand: "timestamp"; value: Date };
  updated_at: { _brand: "timestamp"; value: Date };
}
