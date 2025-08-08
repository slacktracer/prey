export type Prey = {
  body: {
    color: number | string;
    depth: number;
    height: number;
    width: number;
  };
  forward: readonly ["x" | "z", -1 | 1];
  pointer: boolean;
  position: { x: number; y: number; z: number };
  rotateTime: number;
  rotationTimeAccumulator: number;
  rotating: boolean;
  rotation: { current: { y: number }; target: { y: number } };
  speed: number;
  velocity: { x: number; y: number; z: number };
};
