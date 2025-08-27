import type { MakePrey } from "../types/MakePrey.js";
import { makePreyPhysics } from "./make-prey-physics.js";
import { makePreyRendering } from "./make-prey-rendering.js";

export const makePrey: MakePrey = (
  {
    body,
    ColliderDesc,
    position,
    rotateTime,
    speed,
    RigidBodyDesc,
    world,
  },
) => {
  const rendering = makePreyRendering({ body });

  rendering.position.set(
    position.current.x,
    position.current.y,
    position.current.z,
  );

  const physics = makePreyPhysics({
    body,
    ColliderDesc,
    position,
    RigidBodyDesc,
    world,
  });

  return {
    body,
    forward: ["x", 1] as const,
    physics,
    position,
    rendering,
    rotateTime,
    rotating: false,
    rotationTimeAccumulator: 0,
    rotation: {
      current: { y: 0 },
      target: { y: 0 },
    },
    speed,
    velocity: { x: 0, z: 0 },
  };
};
