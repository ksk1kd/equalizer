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
import Link from "next/link";
import DeleteProjectDialog from "./delete-project-dialog";

export default function ProjectsTable() {
  const { projects } = useProjectsContext();

  return (
    <>
      <div className="w-100">
        <Card className="pb-10">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-50">
              {projects?.length !== 0 && (
                <Table>
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
                          <DeleteProjectDialog
                            id={project.id}
                            name={project.name}
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
