import type { Prey } from "./Prey.js";

export type UpdatePreyPhysics = (
  input: { commands: symbol[]; deltaTime: number; prey: Prey },
) => void;
