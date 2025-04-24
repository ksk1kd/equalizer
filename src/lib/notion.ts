export type Pref = {
  name: string;
  amount: number;
};

export type NotionConfig = {
  secret: string;
  database: string;
  property: string;
};

export class NotionClient {
  private config: NotionConfig;

  constructor(config: NotionConfig) {
    this.config = config;
  }

  async fetch(): Promise<string[]> {
    try {
      const response = await fetch("/api/notion", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          database: this.config.database,
          secret: this.config.secret,
        }),
      });
      const data = await response.json();

      return data.results.map(
        (item: {
          properties: { [key: string]: { select: { name: string } } };
        }) => item.properties[this.config.property].select?.name || "",
      );
    } catch (error) {
      console.error("Failed to fetch Notion data:", error);
      return [];
    }
  }
}
