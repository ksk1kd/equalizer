"use client";

import { AppSidebarGroup } from "@/components/app-sidebar-group";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { type Project, useProjectsContext } from "@/contexts/projects";

export function Sidebar({ currentProject }: { currentProject: Project }) {
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
          </FormControl>
        </FormItem>
        <FormItem>
          <FormLabel>Brightness</FormLabel>
          <FormControl>
            <Slider
              min={0.0}
              max={1.0}
              step={0.1}
              value={[
                currentProject.color.brightness.min || 0.0,
                currentProject.color.brightness.max || 1.0,
              ]}
              onValueChange={([min, max]: [number, number]) => {
                if (!dispatch) return;
                dispatch({
                  type: "update:color-brightness",
                  payload: {
                    id: currentProject.id,
                    brightness: [min, max],
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
