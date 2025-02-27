import useData from "./useData";
import { Note } from "@mui/icons-material";
import { FormData } from "../components/NoteLists/BaseNoteForm";
export interface Note extends FormData {
  id: number;
}

const useNote = () => useData<Note>("/api/notes");

export default useNote;
