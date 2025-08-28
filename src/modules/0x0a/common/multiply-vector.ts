import type { MultiplyVector } from "./types/MultiplyVector.js";

export const multiplyVector: MultiplyVector = ({ scalar, vector }) => ({
  x: vector.x * scalar,
  y: vector.y * scalar,
  z: vector.z * scalar,
});
