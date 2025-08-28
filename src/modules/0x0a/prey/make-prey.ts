import { makePreyPhysics } from "./make-prey-physics.js";
import { makePreyRendering } from "./make-prey-rendering.js";
import type { MakePrey } from "./types/MakePrey.js";

export const makePrey: MakePrey = async (
  { position, renderingSettings, world },
) => {
  const rendering = makePreyRendering({ renderingSettings });

  rendering.position.set(
    position.current.x,
    position.current.y,
    position.current.z,
  );

  const physics = await makePreyPhysics({ position, renderingSettings, world });

  return {
    physics,
    position,
    rendering,
  };
};
