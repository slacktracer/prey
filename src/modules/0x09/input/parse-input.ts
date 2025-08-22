import { movingThingCommands } from "../moving-thing/moving-thing-commands.js";
import { otherMovingThingCommands } from "../other-moving-thing/other-moving-thing-commands.js";
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

  // otherMovingThing
  if (input.pressedKeys.s === true) {
    commands.push(otherMovingThingCommands.backward);
  }

  if (input.pressedKeys.a === true) {
    commands.push(otherMovingThingCommands.left);
  }

  if (input.pressedKeys.d === true) {
    commands.push(otherMovingThingCommands.right);
  }

  if (input.pressedKeys.w === true) {
    commands.push(otherMovingThingCommands.forward);
  }

  return commands;
};
