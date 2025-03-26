export interface INotebook {
  id: { _brand: "id"; value: number };
  name: string;
  created_at: { _brand: "created_at"; value: Date };
  updated_at: { _brand: "updated_at"; value: Date };
}
