// src/components/forms/TypeSelect.tsx
import GenericSelect from "./GenericSelect";
import { noteTypeOptionsVer2 } from "@/types";

const optionsWithEmpty = [{ value: "", label: "全部" }, ...noteTypeOptionsVer2];

interface TypeSelectProps {
  name: string;
  label: string;
}

const TypeSelect = ({ name, label }: TypeSelectProps) => (
  <GenericSelect name={name} label={label} options={optionsWithEmpty} />
);

export default TypeSelect;
