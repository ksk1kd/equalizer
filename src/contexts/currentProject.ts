"use client";

import type { Project } from "@/contexts/projects";
import { max } from "d3";
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

export type Segment = {
  opacity: number;
  min: number | null;
  max: number | null;
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
    segments: Segment[];
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
        const name = action.payload.project.name;
        const background = action.payload.project.color.background;
        const hue = action.payload.project.color.hue;
        const brightnessMin = action.payload.project.color.brightness.min;
        const brightnessMax = action.payload.project.color.brightness.max;

        let source: Pref[] = [];
        if (action.payload.project.data.source) {
          source = JSON.parse(action.payload.project.data.source) as Pref[];
        }

        const amountOnlySegments =
          action.payload.project.data.segments
            .replace(" ", "")
            .split(",")
            .filter((n) => n)
            .map((s) => Number(s))
            .sort((a, b) => a - b) || [];

        const segments: Segment[] = [];
        if (amountOnlySegments.length > 0) {
          for (let i = 0; i < amountOnlySegments.length + 1; i++) {
            const min = i !== 0 ? amountOnlySegments[i - 1] + 1 : null;
            const max =
              i !== amountOnlySegments.length ? amountOnlySegments[i] : null;
            const opacity =
              brightnessMin +
              (brightnessMax - brightnessMin) * (i / amountOnlySegments.length);

            segments.push({
              opacity,
              min,
              max,
            });
          }
        }

        return {
          name,
          color: {
            background,
            hue,
            brightness: {
              min: brightnessMin,
              max: brightnessMax,
            },
          },
          data: {
            source,
            segments,
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
