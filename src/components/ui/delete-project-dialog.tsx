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
import { useProjectsContext } from "@/contexts/projects";
import { TrashIcon } from "lucide-react";

export default function DeleteProjectDialog({
  id,
  name,
}: { id: string; name: string }) {
  const { dispatch } = useProjectsContext();

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost" size="sm" className="cursor-pointer">
            <TrashIcon />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-80">
          <DialogHeader>
            <DialogTitle>Delete the project "{name}"?</DialogTitle>
          </DialogHeader>
          <p className="text-sm">
            This action cannot be undone. Once deleted, the project will be
            permanently removed.
          </p>
          <DialogFooter>
            <Button
              type="submit"
              variant="destructive"
              onClick={() => {
                if (!dispatch) return;
                dispatch({
                  type: "delete",
                  payload: {
                    id,
                  },
                });
              }}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
