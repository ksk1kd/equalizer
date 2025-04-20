"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useCurrentProjectContext } from "@/contexts/currentProject";
import { useProjectsContext } from "@/contexts/projects";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { notFound } from "next/navigation";
import { useEffect, useRef } from "react";
import JapanMap from "./japan-map";
import { SidebarGroupColor } from "./sidebar-group-color";
import { SidebarGroupData } from "./sidebar-group-data";

export default function Canvas({
  projectId,
}: {
  projectId: string;
}) {
  const { setCurrentProjectId, currentProject } = useCurrentProjectContext();
  const { projects } = useProjectsContext();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const current = projects?.find((project) => project.id === projectId);

    if (projects && typeof current === "undefined") {
      notFound();
    }

    if (setCurrentProjectId) {
      setCurrentProjectId(projectId);
    }
  }, [projects, projectId, setCurrentProjectId]);

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
        <AppSidebar>
          <SidebarGroupData />
          <SidebarGroupColor />
        </AppSidebar>
        <main className="relative w-screen h-screen">
          <SidebarTrigger
            className={cn(
              triggerVariants({
                background: currentProject?.color.background,
              }),
            )}
          />
          <div
            className={cn(
              canvasVariants({
                background: currentProject?.color.background,
              }),
            )}
          >
            <JapanMap />
          </div>
        </main>
      </SidebarProvider>
    </>
  );
}
