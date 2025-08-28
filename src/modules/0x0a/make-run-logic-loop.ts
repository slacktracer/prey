import { parseInput } from "./input/parse-input.js";
import { updatePrey } from "./prey/update-prey.js";
import type { MakeRunLogicLoop } from "./types/MakeRunLogicLoop.js";

export const makeRunLogicLoop: MakeRunLogicLoop = ({
  fixedTimeStep,
  input,
  maximumNumberOfSubsteps,
  prey,
  time,
  world,
}) =>
({ deltaTime }) => {
  const commands = parseInput({ input, preyCommands: prey.commands });

  time.accumulator += deltaTime;

  let numberOfSubstepsTaken = 0;

  while (
    time.accumulator >= fixedTimeStep &&
    numberOfSubstepsTaken < maximumNumberOfSubsteps
  ) {
    time.accumulator -= fixedTimeStep;

    updatePrey({ commands, prey });

    world.step();

    numberOfSubstepsTaken += 1;
  }
};
