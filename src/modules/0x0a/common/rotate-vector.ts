import type { RotateVector } from "./types/RotateVector.js";

export const rotateVector: RotateVector = ({ quaternion, vector }) => {
  const { x: qx, y: qy, z: qz, w: qw } = quaternion;

  const { x, y, z } = vector;

  const qvx = qw * x + qy * z - qz * y;

  const qvy = qw * y + qz * x - qx * z;

  const qvz = qw * z + qx * y - qy * x;

  const qvw = -qx * x - qy * y - qz * z;

  return {
    x: qvx * qw + qvw * -qx + qvy * -qz - qvz * -qy,

    y: qvy * qw + qvw * -qy + qvz * -qx - qvx * -qz,

    z: qvz * qw + qvw * -qz + qvx * -qy - qvy * -qx,
  };
};
