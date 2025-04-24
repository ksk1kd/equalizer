export type Pref = {
  name: string;
  amount: number;
};

export function countPrefectures(prefArray: string[]): Pref[] {
  const counts = prefArray.reduce(
    (acc: Record<string, number>, pref: string) => {
      acc[pref] = (acc[pref] || 0) + 1;
      return acc;
    },
    {},
  );

  return Object.entries(counts).map(([name, amount]) => ({
    name,
    amount,
  }));
}

// Usage example:
// const prefArray = ['Hokkaido', 'Tokyo', 'Hokkaido'];
// const counts = countPrefectures(prefArray);
// Result: [
//   { name: 'Hokkaido', amount: 2 },
//   { name: 'Tokyo', amount: 1 }
// ]
