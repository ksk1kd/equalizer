import { AppSidebar } from "@/components/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";

export default async function Project({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <SidebarProvider>
        <AppSidebar projectId={id} />
        <main>
          <SidebarTrigger />
        </main>
      </SidebarProvider>
    </>
  );
}
