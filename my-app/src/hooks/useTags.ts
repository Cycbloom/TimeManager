import useData from "./useData";
import { Tag } from "../components/NoteLists/NoteFilterContext";
import { useEffect, useState } from "react";

const useTags = (
  tagsDirty: boolean,
  setTagsDirty: (dirty: boolean) => void
) => {
  const [dep, setDep] = useState(0);

  useEffect(() => {
    if (tagsDirty) {
      setDep((prev) => prev + 1);
      setTagsDirty(false);
    }
  }, [tagsDirty, setTagsDirty]);

  return useData<Tag>("/api/tags", {}, [dep]);
};

export default useTags;
