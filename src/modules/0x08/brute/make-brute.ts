import type { MakeBrute } from "../types/MakeBrute.js";
import { makeBrutePhysics } from "./make-brute-physics.js";
import { makeBruteRendering } from "./make-brute-rendering.js";

export const makeBrute: MakeBrute = (
  {
    body,
    ColliderDesc,
    position,
    speed,
    RigidBodyDesc,
    world,
  },
) => {
  const rendering = makeBruteRendering({ body });

  rendering.position.set(
    position.current.x,
    position.current.y,
    position.current.z,
  );

  const physics = makeBrutePhysics({
    body,
    ColliderDesc,
    position,
    RigidBodyDesc,
    world,
  });

  return {
    body,
    physics,
    position,
    rendering,
    speed,
  };
};
