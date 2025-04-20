"use client";

import { AppSidebarGroup } from "@/components/app-sidebar-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import { type Project, useProjectsContext } from "@/contexts/projects";

export function SidebarGroupData({
  currentProject,
}: { currentProject: Project }) {
  const { dispatch } = useProjectsContext();

  return (
    <>
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
    </>
  );
}
