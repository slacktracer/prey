export const isMapValid = ({ map }: { map: number[][] }) => {
  const xAxisLength = map[0].length;

  return map.every((row: number[]) => row.length === xAxisLength);
};
