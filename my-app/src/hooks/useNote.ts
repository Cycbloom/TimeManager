import useData from "./useData";
import { Note } from "@mui/icons-material";

export interface Note {
  id: number;
  title: string;
  content: string;
}

const useNote = () => useData<Note>("/api/notes");

export default useNote;
