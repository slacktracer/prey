import type { ParseInput } from "../types/ParseInput.js";
import { commands } from "./commands.js";

export const parseInput: ParseInput = ({ input }) => {
  const commandList = [];

  if (input.pressedKeys.ArrowDown === true) {
    commandList.push(commands.backward);
  }

  if (input.pressedKeys.ArrowLeft === true) {
    commandList.push(commands.left);
  }

  if (input.pressedKeys.ArrowRight === true) {
    commandList.push(commands.right);
  }

  if (input.pressedKeys.ArrowUp === true) {
    commandList.push(commands.forward);
  }

  return commandList;
};
