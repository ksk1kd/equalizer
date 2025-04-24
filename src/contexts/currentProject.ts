"use client";

import type { Project } from "@/contexts/projects";
import { countPrefectures } from "@/utils/countPrefectures";
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
    type: "json" | "notion-api-database";
    source: Pref[];
    segments: Segment[];
    notion: {
      secret: string;
      database: string;
      property: string;
      result: string[];
    };
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
      const project = action.payload.project;
      if (!project) return null;

      try {
        let source: Pref[] = [];
        if (
          project.data.type === "notion-api-database" &&
          project.data.notion.result.length > 0
        ) {
          source = countPrefectures(project.data.notion.result);
        } else if (project.data.source) {
          source = JSON.parse(project.data.source) as Pref[];
        }

        const amountOnlySegments =
          project.data.segments
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
              project.color.brightness.min +
              (project.color.brightness.max - project.color.brightness.min) *
                (i / amountOnlySegments.length);

            segments.push({
              opacity,
              min,
              max,
            });
          }
        }

        return {
          name: project.name,
          color: {
            background: project.color.background,
            hue: project.color.hue,
            brightness: {
              min: project.color.brightness.min,
              max: project.color.brightness.max,
            },
          },
          data: {
            type: project.data.type,
            source,
            segments,
            notion: project.data.notion,
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
