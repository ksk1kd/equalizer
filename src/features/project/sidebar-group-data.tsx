"use client";

import { AppSidebarGroup } from "@/components/app-sidebar-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCurrentProjectContext } from "@/contexts/currentProject";
import { useProjectsContext } from "@/contexts/projects";

export function SidebarGroupData() {
  const { projects, dispatch } = useProjectsContext();
  const { currentProjectId, currentProject } = useCurrentProjectContext();

  if (!currentProjectId || !currentProject) return;

  const currentProjectRaw = projects?.filter(
    (project) => project.id === currentProjectId,
  )[0];

  return (
    <>
      <AppSidebarGroup label="Data">
        <FormItem>
          <FormLabel>Source Type</FormLabel>
          <FormControl>
            <Select
              defaultValue="json"
              value={currentProjectRaw?.data.type}
              onValueChange={(value: "json" | "notion-api-database") => {
                if (!dispatch) return;
                dispatch({
                  type: "update:data-type",
                  payload: {
                    id: currentProjectId,
                    type: value,
                  },
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="json">JSON</SelectItem>
                <SelectItem value="notion-api-database">
                  Notion API - Database
                </SelectItem>
              </SelectContent>
            </Select>
          </FormControl>
        </FormItem>
        {currentProjectRaw?.data.type === "json" && (
          <FormItem>
            <FormLabel>Source</FormLabel>
            <FormControl>
              <Textarea
                className="h-40"
                placeholder={
                  '[\n  {\n    "name": "Hokkaido", \n    "amount": 100\n  },\n  {\n    "name": "Tokyo", \n    "amount": 200\n  },\n  {\n    "name": "Osaka", \n    "amount": 150\n  }\n]'
                }
                value={currentProjectRaw?.data.source}
                onChange={(e) => {
                  if (!dispatch) return;
                  dispatch({
                    type: "update:data-source",
                    payload: {
                      id: currentProjectId,
                      source: e.target.value,
                    },
                  });
                }}
              />
            </FormControl>
          </FormItem>
        )}
        {currentProjectRaw?.data.type === "notion-api-database" && (
          <>
            <FormItem>
              <FormLabel>Notion API Secret</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="ntn_xxx..."
                  value={currentProjectRaw?.data.notion?.secret}
                  onChange={(e) => {
                    if (!dispatch) return;
                    dispatch({
                      type: "update:notion-secret",
                      payload: {
                        id: currentProjectId,
                        secret: e.target.value,
                      },
                    });
                  }}
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Notion Database ID</FormLabel>
              <FormControl>
                <Input
                  placeholder="xxxxx..."
                  value={currentProjectRaw?.data.notion?.database}
                  onChange={(e) => {
                    if (!dispatch) return;
                    dispatch({
                      type: "update:notion-database",
                      payload: {
                        id: currentProjectId,
                        database: e.target.value,
                      },
                    });
                  }}
                />
              </FormControl>
            </FormItem>
            <FormItem>
              <FormLabel>Notion Database Property Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Prefecture"
                  value={currentProjectRaw?.data.notion?.property}
                  onChange={(e) => {
                    if (!dispatch) return;
                    dispatch({
                      type: "update:notion-property",
                      payload: {
                        id: currentProjectId,
                        property: e.target.value,
                      },
                    });
                  }}
                />
              </FormControl>
            </FormItem>
          </>
        )}
        <FormItem>
          <FormLabel>Segments</FormLabel>
          <FormControl>
            <Input
              placeholder="50,100,150,200"
              value={currentProjectRaw?.data.segments}
              onChange={(e) => {
                if (!dispatch) return;
                dispatch({
                  type: "update:data-segments",
                  payload: {
                    id: currentProjectId,
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
