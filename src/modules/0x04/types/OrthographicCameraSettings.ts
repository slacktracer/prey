import type { Vector3, WebGLRenderer } from "three";

export type OrthographicCameraSettings = {
  edgeSize: number;
  far: number;
  lookAt: Vector3;
  near: number;
  position: Vector3;
  renderer: undefined | WebGLRenderer;
};
