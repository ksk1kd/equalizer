"use client";

import { AppSidebarGroup } from "@/components/app-sidebar-group";
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
import { useProjectsContext } from "@/contexts/projects";
import { redirect } from "next/navigation";

export function AppSidebar({ projectId }: { projectId: string }) {
  const { projects } = useProjectsContext();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Select
              onValueChange={(value) => redirect(`/project/${value}`)}
              defaultValue={projectId}
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
      <SidebarContent>
        <AppSidebarGroup label="Data">Data Settings</AppSidebarGroup>
        <AppSidebarGroup label="Color">Color Settings</AppSidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  );
}
