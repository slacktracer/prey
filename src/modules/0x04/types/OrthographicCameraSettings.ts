import type { Vector3 } from "three";

export type OrthographicCameraSettings = {
  edgeSize: number;
  far: number;
  lookAt: Vector3;
  near: number;
  position: Vector3;
};
