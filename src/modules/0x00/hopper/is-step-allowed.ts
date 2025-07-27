export const isStepAllowed = ({ hopper, map }) => {
  const xAxisLength = map[0].length;

  let xAxisOffset: number;

  if (xAxisLength % 2 === 0) {
    xAxisOffset = (xAxisLength - 2) / 2;
  } else {
    xAxisOffset = (xAxisLength - 1) / 2;
  }

  const yAxisLength = map.length;

  let yAxisOffset: number;

  if (yAxisLength % 2 === 0) {
    yAxisOffset = (yAxisLength - 2) / 2;
  } else {
    yAxisOffset = (yAxisLength - 1) / 2;
  }

  return (
    map[hopper.position.target.y + yAxisOffset][
      hopper.position.target.x + xAxisOffset
    ] !== 1
  );
};
