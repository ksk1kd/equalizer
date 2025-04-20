"use client";

import type { Project } from "@/contexts/projects";
import {
  type Dispatch,
  type SetStateAction,
  createContext,
  useContext,
} from "react";

export type Pref = {
  name: string;
  amount: number;
};

export type CurrentProject = {
  name: string;
  color: {
    background: "light" | "dark";
    hue: number;
    brightness: {
      min: number;
      max: number;
    };
  };
  data: {
    source: Pref[];
    segments: number[];
  };
};

export type ActionType = {
  type: "update";
  payload: {
    project: Project | null;
  };
};

export const initialCurrentProject = {};
export function currentProjectReducer(
  currentProject: CurrentProject | null,
  action: ActionType,
) {
  switch (action.type) {
    case "update": {
      if (!action.payload.project) return null;

      try {
        return {
          name: action.payload.project.name,
          color: {
            background: action.payload.project.color.background,
            hue: action.payload.project.color.hue,
            brightness: {
              min: action.payload.project.color.brightness.min,
              max: action.payload.project.color.brightness.max,
            },
          },
          data: {
            source: JSON.parse(action.payload.project.data.source) as Pref[],
            segments:
              action.payload.project.data.segments
                .replace(" ", "")
                .split(",")
                .filter((n) => n)
                .map((s) => Number(s)) || [],
          },
        };
      } catch (_) {
        return currentProject;
      }
    }
  }
}

export const CurrentProjectIdContext = createContext<string | null>(null);
export const CurrentProjectIdDispatchContext = createContext<Dispatch<
  SetStateAction<string>
> | null>(null);
export const CurrentProjectContext = createContext<CurrentProject | null>(null);
export const CurrentProjectDispatchContext =
  createContext<Dispatch<ActionType> | null>(null);

export function useCurrentProjectContext() {
  const currentProjectId = useContext(CurrentProjectIdContext);
  const setCurrentProjectId = useContext(CurrentProjectIdDispatchContext);
  const currentProject = useContext(CurrentProjectContext);
  const dispatch = useContext(CurrentProjectDispatchContext);
  return { currentProjectId, setCurrentProjectId, currentProject, dispatch };
}
