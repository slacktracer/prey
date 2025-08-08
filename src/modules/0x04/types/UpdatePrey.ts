import type { Group } from "three";

import type { Prey } from "./Prey";
import type { PreyCommands } from "./PreyCommands.js";

export type UpdatePrey = (input: {
  commands: symbol[];
  prey: Prey & { rendering: Group };
  preyCommands: PreyCommands;
}) => void;
