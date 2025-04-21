"use client";

import { AppSidebarGroup } from "@/components/app-sidebar-group";

import { useCurrentProjectContext } from "@/contexts/currentProject";

const LIGHTNESS = 0.75;
const CHROMA = 0.18;

export function SidebarGroupLegend() {
  const { currentProjectId, currentProject } = useCurrentProjectContext();

  if (!currentProjectId || !currentProject) return;

  return (
    <>
      <AppSidebarGroup label="Legend">
        {currentProject.data.segments.length > 0 && (
          <ul className="grid gap-3">
            {currentProject.data.segments.map((segment) => (
              <li className="flex gap-3" key={segment.min}>
                <div
                  className="h-4 w-20"
                  style={{
                    background: `oklch(${LIGHTNESS} ${CHROMA} ${currentProject.color.hue})`,
                    opacity: segment.opacity,
                  }}
                >
                  {" "}
                </div>
                {segment.min} ~ {segment.max}
              </li>
            ))}
          </ul>
        )}
      </AppSidebarGroup>
    </>
  );
}
