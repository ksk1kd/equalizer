"use client";

import {
  CurrentProjectContext,
  CurrentProjectDispatchContext,
  CurrentProjectIdContext,
  CurrentProjectIdDispatchContext,
  currentProjectReducer,
} from "@/contexts/currentProject";
import { useProjectsContext } from "@/contexts/projects";
import { useEffect, useReducer, useState } from "react";

export function CurrentProjectProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [currentProject, dispatch] = useReducer(currentProjectReducer, null);
  const [currentProjectId, setCurrentProjectId] = useState("");

  const { projects } = useProjectsContext();

  useEffect(() => {
    dispatch({
      type: "update",
      payload: {
        project:
          projects?.filter((project) => project.id === currentProjectId)[0] ||
          null,
      },
    });
  }, [projects, currentProjectId]);

  return (
    <CurrentProjectContext.Provider value={currentProject}>
      <CurrentProjectDispatchContext.Provider value={dispatch}>
        <CurrentProjectIdContext.Provider value={currentProjectId}>
          <CurrentProjectIdDispatchContext.Provider value={setCurrentProjectId}>
            {children}
          </CurrentProjectIdDispatchContext.Provider>
        </CurrentProjectIdContext.Provider>
      </CurrentProjectDispatchContext.Provider>
    </CurrentProjectContext.Provider>
  );
}
