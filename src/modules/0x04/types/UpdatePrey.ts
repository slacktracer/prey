import type { Group } from "three";

import type { PreyCommands } from "./PreyCommands.js";
import type { State } from "./State.js";

export type UpdatePrey = (input: {
  commands: symbol[];
  prey: State["prey"] & { rendering: Group };
  preyCommands: PreyCommands;
}) => void;
