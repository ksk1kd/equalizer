export async function POST(request: Request) {
  try {
    const { database, secret } = await request.json();

    const response = await fetch(
      `https://api.notion.com/v1/databases/${database}/query`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${secret}`,
          "Notion-Version": "2022-06-28",
          "Content-Type": "application/json",
        },
      },
    );

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error("Failed to fetch Notion data:", error);
    return Response.json({ error: "Failed to fetch data" }, { status: 500 });
  }
}
