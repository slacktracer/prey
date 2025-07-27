export const parseInputIntoCommands = ({ commands, hopperCommands, input }) => {
  commands.hopper.clear();

  if (input.pressedKeys.ArrowDown === true) {
    commands.hopper.add(hopperCommands.backward);
  }

  if (input.pressedKeys.ArrowLeft === true) {
    commands.hopper.add(hopperCommands.left);
  }

  if (input.pressedKeys.ArrowRight === true) {
    commands.hopper.add(hopperCommands.right);
  }

  if (input.pressedKeys.ArrowUp === true) {
    commands.hopper.add(hopperCommands.forward);
  }

  return commands;
};
