export const isMapValid = ({ map }: { map: number[][] }) => {
  const xAxisLength = map[0].length;

  // for now, a map is valid if it has at least one "wall" and is a square
  return map.flat().some((position) => position === 1) &&
    map.every((row: number[]) => row.length === xAxisLength);
};
