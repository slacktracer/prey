import type { OrthographicCameraSettings } from "./types/OrthographicCameraSettings.js";

export const orthographicCameraSettings: OrthographicCameraSettings = {
  edgeSize: 12,
  far: 1000,
  lookAt: { x: 0, y: 0, z: 0 },
  near: 1,
  position: { x: 10, y: 100, z: -15 },
};
