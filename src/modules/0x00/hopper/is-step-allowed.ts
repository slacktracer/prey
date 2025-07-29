export const isStepAllowed = ({ hopper, map }) => {
  const xAxisLength = map[0].length;

  let xAxisOffset: number;

  if (xAxisLength % 2 === 0) {
    xAxisOffset = (xAxisLength - 2) / 2;
  } else {
    xAxisOffset = (xAxisLength - 1) / 2;
  }

  const zAxisLength = map.length;

  let zAxisOffset: number;

  if (zAxisLength % 2 === 0) {
    zAxisOffset = (zAxisLength - 2) / 2;
  } else {
    zAxisOffset = (zAxisLength - 1) / 2;
  }

  return (
    map[hopper.position.target.z + zAxisOffset][
      hopper.position.target.x + xAxisOffset
    ] !== 1
  );
};
