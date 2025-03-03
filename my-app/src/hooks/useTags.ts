import useData from "./useData";
import { Tag } from "../components/NoteLists/NoteFilterContext";

const useTags = (TagsDirty: number) =>
  useData<Tag>("/api/tags", {}, [TagsDirty]);
export default useTags;
