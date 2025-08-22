import { movingThingCommands } from "../moving-thing/moving-thing-commands.js";
import type { ParseInput } from "../types/ParseInput.js";

export const parseInput: ParseInput = ({ input }) => {
  const commands = [];

  if (input.pressedKeys.ArrowDown === true) {
    commands.push(movingThingCommands.backward);
  }

  if (input.pressedKeys.ArrowLeft === true) {
    commands.push(movingThingCommands.left);
  }

  if (input.pressedKeys.ArrowRight === true) {
    commands.push(movingThingCommands.right);
  }

  if (input.pressedKeys.ArrowUp === true) {
    commands.push(movingThingCommands.forward);
  }

  return commands;
};
