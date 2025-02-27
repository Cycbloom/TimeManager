import { NoteFilterProvider } from "./NoteFilterContext";
import NotePage from "./NotesPage";

const NotePageContainer = () => {
  return (
    <NoteFilterProvider>
      <NotePage />
    </NoteFilterProvider>
  );
};

export default NotePageContainer;
