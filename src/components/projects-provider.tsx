"use client";

import {
  ProjectsContext,
  ProjectsDispatchContext,
  initialProjects,
  projectsReducer,
} from "@/contexts/projects";
import type * as React from "react";
import { useReducer } from "react";

export function ProjectsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [projects, dispatch] = useReducer(projectsReducer, initialProjects);

  return (
    <ProjectsContext.Provider value={projects}>
      <ProjectsDispatchContext.Provider value={dispatch}>
        {children}
      </ProjectsDispatchContext.Provider>
    </ProjectsContext.Provider>
  );
}
