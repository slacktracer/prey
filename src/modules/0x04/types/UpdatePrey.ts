import type { Group } from "three";

import type { Prey } from "./Prey.js";
import type { PreyCommands } from "./PreyCommands.js";

export type UpdatePrey = (input: {
  commands: symbol[];
  deltaTime: number;
  prey: Prey & { rendering: Group };
  preyCommands: PreyCommands;
}) => void;
