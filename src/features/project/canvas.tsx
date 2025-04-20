"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { type Project, useProjectsContext } from "@/contexts/projects";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { notFound } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import JapanMap from "./japan-map";
import type { Pref } from "./japan-map";
import { SidebarGroupColor } from "./sidebar-group-color";
import { SidebarGroupData } from "./sidebar-group-data";

export default function Canvas({
  projectId,
}: {
  projectId: string;
}) {
  const { projects } = useProjectsContext();
  const [currentProject, setCurrentProject] = useState<
    Project | undefined | null
  >(null);
  const isFirstRender = useRef(true);
  const [data, setData] = useState<Pref[]>([]);
  const [segments, setSegments] = useState<number[]>([]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const current = projects?.find((project) => project.id === projectId);
    setCurrentProject(current);

    if (projects && typeof current === "undefined") {
      notFound();
    }

    try {
      const parsedData = JSON.parse(current?.data.source || "");
      setData(parsedData);
    } catch (_) {}

    try {
      const splitedSegments = current?.data.segments
        .replace(" ", "")
        .split(",")
        .filter((n) => n)
        .map((s) => Number(s));

      setSegments([...new Set(splitedSegments)]);
    } catch (_) {}
  }, [projects, projectId]);

  if (!projects || !currentProject) return null;

  const triggerVariants = cva(
    "text-gray-400 hover:bg-transparent dark:hover:bg-transparent",
    {
      variants: {
        background: {
          light: "hover:text-light-foreground",
          dark: "hover:text-dark-foreground",
        },
      },
      defaultVariants: {
        background: "light",
      },
    },
  );

  const canvasVariants = cva(
    "absolute top-0 left-0 w-full h-full -z-10 bg-white flex items-center justify-center",
    {
      variants: {
        background: {
          light: "bg-light-background",
          dark: "bg-dark-background",
        },
      },
      defaultVariants: {
        background: "light",
      },
    },
  );

  return (
    <>
      <SidebarProvider>
        <AppSidebar currentProject={currentProject}>
          <SidebarGroupData currentProject={currentProject} />
          <SidebarGroupColor currentProject={currentProject} />
        </AppSidebar>
        <main className="relative w-screen h-screen">
          <SidebarTrigger
            className={cn(
              triggerVariants({ background: currentProject.color.background }),
            )}
          />
          <div
            className={cn(
              canvasVariants({ background: currentProject.color.background }),
            )}
          >
            <JapanMap
              data={data}
              segments={segments}
              hue={currentProject.color.hue}
              brightness={currentProject.color.brightness}
            />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
