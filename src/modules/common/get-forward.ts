const halfPI = Math.PI / 2;
const PI = Math.PI;
const PIAndAHalf = Math.PI * 1.5;

export const getForward = ({ rotation }: { rotation: number }) => {
  const x = rotation / (PI / 2);
  const y = Math.round(x) % 4;
  const z = y * (PI / 2);

  const rotationSign = Math.sign(z + Number.EPSILON);

  const absoluteRotation = Math.abs(z * rotationSign);

  let forward;

  switch (absoluteRotation) {
    case PI:
      forward = ["x", -1];

      break;

    case halfPI:
      forward = ["z", -rotationSign];

      break;

    case PIAndAHalf:
      forward = ["z", rotationSign];

      break;

    case 0:
      forward = ["x", 1];

      break;

    default:
      console.warn("Unexpected rotation", absoluteRotation);
  }

  return forward;
};
