"use client";

import { type Dispatch, createContext, useContext } from "react";

type Project = {
  id: string;
  name: string;
};

type ActionType = {
  type: "add";
  payload: {
    id: string;
    name: string;
  };
};

export const initialProjects = [];
export function projectsReducer(projects: Project[], action: ActionType) {
  switch (action.type) {
    case "add": {
      return [
        ...projects,
        {
          id: action.payload.id,
          name: action.payload.name,
        },
      ];
    }
    default: {
      throw Error(`Unknown action: ${action.type}`);
    }
  }
}

export const ProjectsContext = createContext<Project[] | null>(null);
export const ProjectsDispatchContext =
  createContext<Dispatch<ActionType> | null>(null);

export function useProjectsContext() {
  const projects = useContext(ProjectsContext);
  const dispatch = useContext(ProjectsDispatchContext);
  return { projects, dispatch };
}
