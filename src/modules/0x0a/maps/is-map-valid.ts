export const isMapValid = ({ map }: { map: number[][] }) => {
  const xAxisLength = map[0].length;

  return map.flat().some((position) => position === 1) &&
    map.every((row: number[]) => row.length === xAxisLength);
};
