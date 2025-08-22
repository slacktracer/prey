import type { MovingThing } from "../moving-thing/MovingThing.js";

export type OrthographicCameraMovement = {
  getOrthographicCameraPositionDelta: (
    input: {
      deltaTime: number;
      movingThing: MovingThing;
      orthographicCameraGroupPosition: { x: number; z: number };
    },
  ) => { x: number; z: number };

  speed: number;

  target: { x: number; z: number };
};
