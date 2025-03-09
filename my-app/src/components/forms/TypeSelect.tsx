// src/components/forms/TypeSelect.tsx
import { GenericSelect } from "./GenericSelect";
import { noteTypeOptionsVer2 } from "@/types";

export const TypeSelect = () => (
  <GenericSelect name="type" label="类型" options={noteTypeOptionsVer2} />
);
