import type { GetForward } from "./types/GetForward.js";

const halfPI = Math.PI / 2;
const PI = Math.PI;
const PIAndAHalf = Math.PI * 1.5;

export const getForward: GetForward = ({ rotation }) => {
  const x = rotation / (PI / 2);
  const y = Math.round(x) % 4;
  const z = y * (PI / 2);

  const rotationSign = Math.sign(z + Number.EPSILON);

  const absoluteRotation = Math.abs(z);

  let forward;

  switch (absoluteRotation) {
    case PI:
      forward = ["x", -1] as const;

      break;

    case halfPI:
      forward = ["z", -rotationSign as -1 | 1] as const;

      break;

    case PIAndAHalf:
      forward = ["z", rotationSign as -1 | 1] as const;

      break;

    case 0:
      forward = ["x", 1] as const;

      break;

    default:
      console.warn("Unexpected rotation", absoluteRotation);

      forward = ["x", 1] as const;
  }

  return forward;
};
