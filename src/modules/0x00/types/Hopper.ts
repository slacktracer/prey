import type { Object3D } from "three";

export type Hopper = {
  height: number;
  moving: boolean;
  position: {
    current: { x: number; y: number; z: number };
    target: { x: number; y: number; z: number };
  };
  rendering: Object3D;
  rotation: {
    current: { x: number; y: number; z: number };
    target: { x: number; y: number; z: number };
  };
  stepTime: number;
  lastMoveInitiationTime: number;
};
