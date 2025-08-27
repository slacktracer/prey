// import type { World } from "@dimforge/rapier3d";

import type { Input } from "../input/types/Input.js";

export type MakeRunLogicLoop = (input: {
  fixedTimeStep: number;
  input: Input;
  maximumNumberOfSubsteps: number;
  time: { accumulator: number };
  // world: World;
}) => (input: { deltaTime: number }) => void;
