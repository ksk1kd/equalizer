"use client";

import { type Dispatch, createContext, useContext } from "react";

export type Project = {
  id: string;
  name: string;
};

export type ActionType =
  | {
      type: "init";
      payload: Project[];
    }
  | {
      type: "add";
      payload: {
        id: string;
        name: string;
      };
    };

export const initialProjects = [];
export function projectsReducer(projects: Project[], action: ActionType) {
  switch (action.type) {
    case "init": {
      return action.payload;
    }
    case "add": {
      return [
        ...projects,
        {
          id: action.payload.id,
          name: action.payload.name,
        },
      ];
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
