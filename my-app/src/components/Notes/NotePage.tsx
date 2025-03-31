// src/components/NoteLists/NotePage.tsx
import { DataProvider } from "@/data/DataContext";
import NotePageContent from "./NotesPageContent";
import { NotebookProvider } from "./NotebookContext";
const NotePage = () => {
  return (
    <DataProvider>
      <NotebookProvider>
        <NotePageContent />
      </NotebookProvider>
    </DataProvider>
  );
};

export default NotePage;
