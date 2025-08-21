import type { World } from "@dimforge/rapier3d";

import type { Brute } from "./Brute.js";
import type { Input } from "./Input.js";
import type { ParseInput } from "./ParseInput.js";
import type { Prey } from "./Prey.js";
import type { PreyCommands } from "./PreyCommands.js";

export type MakeRunLogicLoop = (input: {
  brute: Brute;
  fixedTimeStep: number;
  input: Input;
  maximumNumberOfSubsteps: number;
  parseInput: ParseInput;
  prey: Prey;
  preyCommands: PreyCommands;
  time: { accumulator: number };
  world: World;
}) => (input: { deltaTime: number }) => void;
