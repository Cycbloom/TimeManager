import useData from "./useData";
import { Tag } from "../components/NoteLists/NoteFilterContext";

const useTags = () => useData<Tag>("/api/tags");

export default useTags;
