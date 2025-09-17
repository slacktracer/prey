import { parseInput } from "./input/parse-input.js";
import { updatePrey } from "./prey/update-prey.js";
import type { MakeRunLogicLoop } from "./types/MakeRunLogicLoop.js";

export const makeRunLogicLoop: MakeRunLogicLoop = ({
  fixedTimeStep,
  input,
  maximumNumberOfSubsteps,
  otherControlled,
  prey,
  time,
  world,
}) =>
({ deltaTime, other }) => {
  const commands = parseInput({
    input,
    preyCommands: otherControlled
      ? (other?.commands || {})
      : (prey?.commands || {}),
  });

  time.accumulator += deltaTime;

  let numberOfSubstepsTaken = 0;

  while (
    time.accumulator >= fixedTimeStep &&
    numberOfSubstepsTaken < maximumNumberOfSubsteps
  ) {
    time.accumulator -= fixedTimeStep;

    if (prey) {
      updatePrey({
        commands: otherControlled ? [] : commands,
        deltaTime: fixedTimeStep,
        prey,
      });
    }

    if (other) {
      updatePrey({
        commands: otherControlled ? commands : [],
        deltaTime: fixedTimeStep,
        prey: other,
      });
    }

    world.step();

    numberOfSubstepsTaken += 1;
  }
};
