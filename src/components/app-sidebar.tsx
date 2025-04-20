"use client";

import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useCurrentProjectContext } from "@/contexts/currentProject";
import { useProjectsContext } from "@/contexts/projects";
import { House } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type React from "react";

export function AppSidebar({ children }: { children: React.ReactNode }) {
  const { projects } = useProjectsContext();
  const { currentProjectId } = useCurrentProjectContext();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Select
              onValueChange={(value) => router.push(`/project/${value}`)}
              defaultValue={currentProjectId || ""}
            >
              <SelectTrigger className="w-full border-0">
                <SelectValue placeholder="Project" />
              </SelectTrigger>
              <SelectContent>
                {projects?.map((project) => (
                  <SelectItem value={project.id} key={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>{children}</SidebarContent>
      <SidebarFooter>
        <div className="flex gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="cursor-pointer"
            asChild
          >
            <Link href="/">
              <House />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
