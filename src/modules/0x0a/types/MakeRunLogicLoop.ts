import type { World } from "@dimforge/rapier3d";

import type { Input } from "../input/types/Input.js";
import type { Prey } from "../prey/types/Prey.js";

export type MakeRunLogicLoop = (input: {
  fixedTimeStep: number;
  input: Input;
  maximumNumberOfSubsteps: number;
  other?: Prey;
  prey?: Prey;
  time: { accumulator: number };
  world: World;
}) => (input: { deltaTime: number }) => void;
