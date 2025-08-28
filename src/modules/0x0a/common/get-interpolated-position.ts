import { MathUtils } from "three";

import type { GetInterpolatedPosition } from "./types/GetInterpolatedPosition.js";

export const getInterpolatedPosition: GetInterpolatedPosition = (
  { interpolationFactor, position },
) => ({
  x: MathUtils.lerp(
    position.previous.x,
    position.current.x,
    interpolationFactor,
  ),

  z: MathUtils.lerp(
    position.previous.z,
    position.current.z,
    interpolationFactor,
  ),
});
