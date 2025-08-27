import type { Prey } from "./Prey.js";
import type { PreyCommands } from "./PreyCommands.js";

export type UpdatePrey = (params: {
  commands: symbol[];
  deltaTime: number;
  prey: Prey;
  preyCommands: PreyCommands;
}) => void;
