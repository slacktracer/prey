export const isMovementAllowed = (
  { map, targetPosition },
) => {
  const xAxisLength = map[0].length;

  const xAxisOffset = xAxisLength % 2 === 0
    ? (xAxisLength - 2) / 2
    : (xAxisLength - 1) / 2;

  const zAxisLength = map.length;

  const zAxisOffset = zAxisLength % 2 === 0
    ? (zAxisLength - 2) / 2
    : (zAxisLength - 1) / 2;

  return map[targetPosition.z + zAxisOffset][
    targetPosition.x + xAxisOffset
  ] !== 1;
};
