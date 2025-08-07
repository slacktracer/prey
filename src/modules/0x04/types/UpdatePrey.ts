import type { Group } from "three";

import type { State } from "../state/State.js";
import type { PreyCommands } from "./PreyCommands.js";

export type UpdatePrey = (input: {
  commands: symbol[];
  prey: State["prey"] & { rendering: Group };
  preyCommands: PreyCommands;
}) => void;
