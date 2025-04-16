import Canvas from "@/features/project/canvas";

export default async function Project({
  params,
}: {
  params: { id: string };
}) {
  const { id } = await params;

  return (
    <>
      <Canvas projectId={id} />
    </>
  );
}
