import Canvas from "@/features/project/canvas";

export default function Project({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
    <>
      <Canvas projectId={id} />
    </>
  );
}
