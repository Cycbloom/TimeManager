// src/components/forms/TypeSelect.tsx
import GenericSelect from "./GenericSelect";
import { noteTypeOptionsVer2 } from "@/types";

const optionsWithEmpty = [{ value: "", label: "全部" }, ...noteTypeOptionsVer2];

const TypeSelect = () => (
  <GenericSelect name="type" label="类型" options={optionsWithEmpty} />
);

export default TypeSelect;
