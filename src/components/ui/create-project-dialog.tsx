"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useProjectsContext } from "@/contexts/projects";
import { useState } from "react";

export default function CreateProjectDialog() {
  const [projectName, setProjectName] = useState("");
  const { dispatch } = useProjectsContext();

  return (
    <>
      <Dialog>
        <DialogTrigger>Create New Project</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="project-name" className="text-right">
                Project Name
              </Label>
              <Input
                id="project-name"
                className="col-span-3"
                onChange={(e) => setProjectName(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              onClick={() => {
                if (!dispatch) return;
                setProjectName("");
                dispatch({
                  type: "add",
                  payload: {
                    id: crypto.randomUUID(),
                    name: projectName,
                  },
                });
              }}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
