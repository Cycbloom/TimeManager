// src/components/NoteLists/NotePageContainer.tsx
import { DataProvider } from "../../data/DataContext";
import { NoteFilterProvider } from "./NoteFilterContext";
import NotePage from "./NotesPage";

const NotePageContainer = () => {
  return (
    <DataProvider>
      <NoteFilterProvider>
        <NotePage />
      </NoteFilterProvider>
    </DataProvider>
  );
};

export default NotePageContainer;
