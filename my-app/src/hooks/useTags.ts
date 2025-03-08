// src/hooks/useTags.ts
import useData from "./useData";
import { Tag } from "../components/NoteLists/NoteFilterContext";

/**
 * @deprecated This hook is no longer recommended for use.
 */
const useTags = (TagsDirty: number) =>
  useData<Tag>("/api/tags", {}, [TagsDirty]);
export default useTags;
