// src/components/Tasks/TaskFilterContext.tsx
import { createContext, useState } from "react";

interface TaskFilterContextType {
  status: string;
  priority: string;
  tags: string[];
  setStatus: (status: string) => void;
  setPriority: (priority: string) => void;
  setTags: (tags: string[]) => void;
}

export const TaskFilterContext = createContext<TaskFilterContextType>({
  status: "",
  priority: "",
  tags: [],
  setStatus: () => {},
  setPriority: () => {},
  setTags: () => {},
});

export const TaskFilterProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [tags, setTags] = useState<string[]>([]);

  return (
    <TaskFilterContext.Provider
      value={{ status, priority, tags, setStatus, setPriority, setTags }}
    >
      {children}
    </TaskFilterContext.Provider>
  );
};
