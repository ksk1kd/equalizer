"use client";

import { AppSidebarGroup } from "@/components/app-sidebar-group";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { type Project, useProjectsContext } from "@/contexts/projects";
import { House } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function AppSidebar({ currentProject }: { currentProject: Project }) {
  const { projects, dispatch } = useProjectsContext();
  const router = useRouter();

  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <Select
              onValueChange={(value) => router.push(`/project/${value}`)}
              defaultValue={currentProject.id}
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
        <AppSidebarGroup label="Color">
          <FormItem>
            <FormLabel>Background</FormLabel>
            <FormControl>
              <RadioGroup
                defaultValue={currentProject.color.background}
                onValueChange={(value: "light" | "dark") => {
                  if (!dispatch) return;
                  dispatch({
                    type: "update:color-background",
                    payload: {
                      id: currentProject.id,
                      background: value,
                    },
                  });
                }}
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="background-light" />
                  <Label htmlFor="background-light">Light</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="background-dark" />
                  <Label htmlFor="background-dark">Dark</Label>
                </div>
              </RadioGroup>
            </FormControl>
          </FormItem>
        </AppSidebarGroup>
      </SidebarContent>
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
