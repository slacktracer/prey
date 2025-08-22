import type { MovingThingCommands } from "../moving-thing/MovingThingCommands.js";
import type { Input } from "./Input.js";

export type ParseInput = (input: {
  input: Input;
  movingThingCommands: MovingThingCommands;
}) => symbol[];
