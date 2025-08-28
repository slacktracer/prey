import type { Prey } from "./Prey.js";

export type UpdatePreyRenderingPosition = (
  input: { interpolationFactor: number; prey: Prey },
) => void;
