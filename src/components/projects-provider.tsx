"use client";

import {
  type ActionType,
  type Project,
  ProjectsContext,
  ProjectsDispatchContext,
  initialProjects,
  projectsReducer,
} from "@/contexts/projects";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import type * as React from "react";

export function ProjectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, dispatch] = useLocalStorage<Project[], ActionType>(
    "projects",
    initialProjects,
    projectsReducer,
  );

  return (
    <ProjectsContext.Provider value={projects}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsContext.Provider>
  );
}
