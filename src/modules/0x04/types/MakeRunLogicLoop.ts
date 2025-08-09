import type { Group } from "three";

import type { Input } from "./Input.js";
import type { ParseInput } from "./ParseInput.js";
import type { Prey } from "./Prey";
import type { PreyCommands } from "./PreyCommands.js";
import type { UpdatePrey } from "./UpdatePrey.js";

export type MakeRunLogicLoop = (input: {
  fixedTimeStep: number;
  input: Input;
  map: number[][];
  maximumNumberOfSubsteps: number;
  parseInput: ParseInput;
  prey: Prey & { rendering: Group };
  preyCommands: PreyCommands;
  time: {
    accumulator: number;
    lastUpdateTime: number;
  };
  updatePrey: UpdatePrey;
}) => () => void;
