import CreateProjectDialog from "@/components/ui/create-project-dialog";
import ProjectsTable from "@/components/ui/projects-table";

export default function Home() {
  return (
    <>
      <div className="flex flex-col gap-4">
        <ProjectsTable />
        <CreateProjectDialog />
      </div>
    </>
  );
}
