import { makePreyRendering } from "./make-prey-rendering.js";
import type { MakePrey } from "./types/MakePrey.js";

export const makePrey: MakePrey = ({ position, renderingSettings }) => {
  const rendering = makePreyRendering({ renderingSettings });

  rendering.position.set(
    position.current.x,
    position.current.y,
    position.current.z,
  );

  return {
    position,
    rendering,
  };
};
