import type { ParseInput } from "./types/ParseInput.js";

export const parseInput: ParseInput = ({ input, preyCommands }) => {
  const commands = [];

  if (input.pressedKeys.ArrowDown === true) {
    commands.push(preyCommands.backward);
  }

  if (input.pressedKeys.ArrowLeft === true) {
    commands.push(preyCommands.left);
  }

  if (input.pressedKeys.ArrowRight === true) {
    commands.push(preyCommands.right);
  }

  if (input.pressedKeys.ArrowUp === true) {
    commands.push(preyCommands.forward);
  }

  return commands;
};
