import type { Input } from "./Input.js";

export type ParseInput = (input: {
  input: Input;
  preyCommands: { [key: string]: symbol };
}) => symbol[];
