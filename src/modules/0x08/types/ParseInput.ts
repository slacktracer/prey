import type { Input } from "./Input.js";
import type { PreyCommands } from "./PreyCommands.js";

export type ParseInput = (input: {
  input: Input;
  preyCommands: PreyCommands;
}) => symbol[];
