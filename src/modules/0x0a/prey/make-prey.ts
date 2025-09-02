import { makePreyPhysics } from "./make-prey-physics.js";
import { makePreyRendering } from "./make-prey-rendering.js";
import { preyCommands } from "./prey-commands.js";
import type { MakePrey } from "./types/MakePrey.js";

export const makePrey: MakePrey = async (
  { characterController, physicsSettings, position, renderingSettings, world },
) => {
  const rendering = makePreyRendering({ renderingSettings });

  rendering.position.set(
    position.current.x,
    position.current.y,
    position.current.z,
  );

  const physics = await makePreyPhysics({
    physicsSettings,
    position,
    renderingSettings,
    world,
  });

  return {
    characterController,
    commands: preyCommands,
    physics,
    physicsSettings,
    position,
    rendering,
  };
};
