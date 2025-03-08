// src/components/NoteLists/NotePage.tsx
import { DataProvider } from "../../data/DataContext";
import { NoteFilterProvider } from "./NoteFilterContext";
import NotePageContent from "./NotesPageContent";

const NotePage = () => {
  return (
    <DataProvider>
      <NoteFilterProvider>
        <NotePageContent />
      </NoteFilterProvider>
    </DataProvider>
  );
};

export default NotePage;
