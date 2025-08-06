import { preyCommands } from "../prey/prey-commands.js";
import { input } from "./input.js";

export const parseInput = () => {
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
