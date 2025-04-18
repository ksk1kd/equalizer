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
import { redirect } from "next/navigation";
import { useState } from "react";

export default function CreateProjectDialog() {
  const [projectName, setProjectName] = useState("");
  const { dispatch } = useProjectsContext();

  return (
    <>
      <Dialog>
        <DialogTrigger className="text-sm">Create a new project</DialogTrigger>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-4">
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
                const id = crypto.randomUUID();
                dispatch({
                  type: "add",
                  payload: {
                    id,
                    name: projectName,
                  },
                });
                redirect(`/project/${id}`);
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
