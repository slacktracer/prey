import { bruteCommands } from "../brute/brute-commands";
import { updateBrute } from "../brute/update-brute";
import { updatePrey } from "../prey/update-prey";
import type { MakeRunLogicLoop } from "../types/MakeRunLogicLoop.js";

export const makeRunLogicLoop: MakeRunLogicLoop = ({
  brute,
  fixedTimeStep,
  input,
  maximumNumberOfSubsteps,
  parseInput,
  prey,
  preyCommands,
  time,
  world,
}) =>
({ deltaTime }) => {
  const commands = parseInput({ input, preyCommands });

  time.accumulator += deltaTime;

  let numberOfSubstepsTaken = 0;

  while (
    time.accumulator >= fixedTimeStep &&
    numberOfSubstepsTaken < maximumNumberOfSubsteps
  ) {
    time.accumulator -= fixedTimeStep;

    updateBrute({
      brute,
      bruteCommands,
      commands: [bruteCommands.forward],
      deltaTime: fixedTimeStep,
    });

    updatePrey({ commands, deltaTime: fixedTimeStep, prey, preyCommands });

    world.step();

    numberOfSubstepsTaken += 1;
  }
};
