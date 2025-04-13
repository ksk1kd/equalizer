"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useProjectsContext } from "@/contexts/projects";
import { TrashIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "./button";

export default function ProjectsTable() {
  const { projects, dispatch } = useProjectsContext();

  return (
    <>
      <div className="w-100">
        <Card className="pb-10">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-50">
              {projects?.length !== 0 ? (
                <>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="text-xs h-8">Name</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {projects?.map((project) => (
                        <TableRow key={project.id}>
                          <TableCell className="text-base">
                            <Link
                              href={`/project/${project.id}`}
                              className="block p-2"
                            >
                              {project.name}
                            </Link>
                          </TableCell>
                          <TableCell className="w-5">
                            <Button
                              variant="ghost"
                              size="sm"
                              className="cursor-pointer"
                              onClick={() => {
                                if (!dispatch) return;
                                dispatch({
                                  type: "delete",
                                  payload: {
                                    id: project.id,
                                  },
                                });
                              }}
                            >
                              <TrashIcon />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </>
              ) : (
                <p className="text-sm">No project.</p>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
