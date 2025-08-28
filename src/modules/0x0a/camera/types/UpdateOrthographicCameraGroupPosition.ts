import type { Group } from "three";

export type UpdateOrthographicCameraGroupPosition = (
  input: {
    following: { rendering: { position: { x: number; z: number } } };
    interpolationFactor: number;
    orthographicCameraGroup: Group;
  },
) => void;
