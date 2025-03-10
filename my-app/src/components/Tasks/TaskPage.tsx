import { DataProvider } from "@/data/DataContext";
import TaskPageContent from "./TaskPageContent";
const TaskPage = () => {
  return (
    <DataProvider>
      <TaskPageContent />
    </DataProvider>
  );
};

export default TaskPage;
