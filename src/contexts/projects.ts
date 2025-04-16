"use client";

import { useTheme } from "next-themes";
import { type Dispatch, createContext, useContext } from "react";

export type Project = {
  id: string;
  name: string;
  color: {
    background: "light" | "dark";
  };
  data: {
    source: string;
    segments: string;
  };
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
    }
  | {
      type: "delete";
      payload: {
        id: string;
      };
    }
  | {
      type: "update:color-background";
      payload: {
        id: string;
        background: "light" | "dark";
      };
    }
  | {
      type: "update:data-source";
      payload: {
        id: string;
        source: string;
      };
    }
  | {
      type: "update:data-segments";
      payload: {
        id: string;
        segments: string;
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
          color: {
            background: "dark",
          },
          data: {
            source: "",
            segments: "",
          },
        } as Project,
      ];
    }
    case "delete": {
      return projects.filter((project) => project.id !== action.payload.id);
    }
    case "update:color-background": {
      return projects.map((project) =>
        project.id === action.payload.id
          ? {
              ...project,
              color: {
                ...project.color,
                background: action.payload.background,
              },
            }
          : project,
      );
    }
    case "update:data-source": {
      return projects.map((project) =>
        project.id === action.payload.id
          ? {
              ...project,
              data: {
                ...project.data,
                source: action.payload.source,
              },
            }
          : project,
      );
    }
    case "update:data-segments": {
      return projects.map((project) =>
        project.id === action.payload.id
          ? {
              ...project,
              data: {
                ...project.data,
                segments: action.payload.segments,
              },
            }
          : project,
      );
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
