const halfPI = Math.PI / 2;
const PI = Math.PI;
const PIAndAHalf = Math.PI * 1.5;

export const getForward = ({ rotation }: { rotation: number }) => {
  const x = rotation / (Math.PI / 2);
  const y = Math.round(x) % 4;
  const z = y * (Math.PI / 2);

  const rotationSign = Math.sign(z + Number.EPSILON);

  const absoluteRotation = Math.abs(z * rotationSign);

  let forward;

  switch (absoluteRotation) {
    case PI:
      forward = ["y", -1];

      break;

    case halfPI:
      forward = ["x", -rotationSign];

      break;

    case PIAndAHalf:
      forward = ["x", rotationSign];

      break;

    case 0:
      forward = ["y", 1];

      break;

    default:
      console.warn("Unexpected rotation", absoluteRotation);
  }

  return forward;
};
