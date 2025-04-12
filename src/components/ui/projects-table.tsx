"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useProjectsContext } from "@/contexts/projects";

export default function ProjectsTable() {
  const { projects } = useProjectsContext();

  return (
    <>
      <div className="w-100">
        <Card className="min-h-40 max-h-80">
          <CardHeader>
            <CardTitle>Projects</CardTitle>
          </CardHeader>
          <CardContent>
            {projects?.length !== 0 ? (
              projects?.map((project) => project.name)
            ) : (
              <p>No project.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
