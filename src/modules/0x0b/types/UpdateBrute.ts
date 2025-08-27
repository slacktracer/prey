import type { Brute } from "./Brute.js";
import type { BruteCommands } from "./BruteCommands.js";

export type UpdateBrute = (params: {
  commands: symbol[];
  brute: Brute;
  bruteCommands: BruteCommands;
  deltaTime: number;
}) => void;
