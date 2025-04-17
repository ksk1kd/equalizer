"use client";

import { AppSidebarGroup } from "@/components/app-sidebar-group";
import { Button } from "@/components/ui/button";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
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
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
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
        <AppSidebarGroup label="Data">
          <FormItem>
            <FormLabel>Source</FormLabel>
            <FormControl>
              <Textarea
                className="h-40"
                placeholder={
                  '[\n  {\n    "name": "Hokkaido", \n    "amount": 100\n  },\n  {\n    "name": "Tokyo", \n    "amount": 200\n  },\n  {\n    "name": "Osaka", \n    "amount": 150\n  }\n]'
                }
                defaultValue={currentProject.data.source}
                onChange={(e) => {
                  if (!dispatch) return;
                  dispatch({
                    type: "update:data-source",
                    payload: {
                      id: currentProject.id,
                      source: e.target.value,
                    },
                  });
                }}
              />
            </FormControl>
          </FormItem>
          <FormItem>
            <FormLabel>Segments</FormLabel>
            <FormControl>
              <Input
                placeholder="50,100,150,200"
                defaultValue={currentProject.data.segments}
                onChange={(e) => {
                  if (!dispatch) return;
                  dispatch({
                    type: "update:data-segments",
                    payload: {
                      id: currentProject.id,
                      segments: e.target.value,
                    },
                  });
                }}
              />
            </FormControl>
          </FormItem>
        </AppSidebarGroup>
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
          <FormItem>
            <FormLabel>Hue</FormLabel>
            <FormControl>
              <div className="flex gap-2">
                <Slider
                  min={0}
                  max={360}
                  value={[currentProject.color.hue || 0]}
                  backgroundColor={`oklch(0.7 0.1 ${currentProject.color.hue})`}
                  onValueChange={([value]: number[]) => {
                    if (!dispatch) return;
                    dispatch({
                      type: "update:color-hue",
                      payload: {
                        id: currentProject.id,
                        hue: value,
                      },
                    });
                  }}
                />
                <Input
                  type="number"
                  min={0}
                  max={360}
                  value={currentProject.color.hue || 0}
                  onChange={(e) => {
                    if (!dispatch) return;
                    dispatch({
                      type: "update:color-hue",
                      payload: {
                        id: currentProject.id,
                        hue: Number(e.target.value),
                      },
                    });
                  }}
                  className="w-16 text-center"
                />
              </div>
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
