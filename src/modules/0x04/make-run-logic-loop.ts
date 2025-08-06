import { parseInput } from "./input/parse-input.js";
import { updatePrey } from "./prey/update-prey.js";

export const makeRunLogicLoop = ({
  fixedTimeStep,
  maximumNumberOfSubsteps,
  time,
}) =>
({ prey }) => {
  time.lastUpdateTime ||= performance.now();

  const currentTime = performance.now();

  const frameDeltaTimeCap = fixedTimeStep * maximumNumberOfSubsteps;

  const frameDeltaTime = Math.min(
    currentTime - time.lastUpdateTime,
    frameDeltaTimeCap,
  );

  const commands = parseInput();

  time.lastUpdateTime = currentTime;

  time.accumulator += frameDeltaTime;

  let numberOfSubstepsTaken = 0;

  while (
    time.accumulator >= fixedTimeStep &&
    numberOfSubstepsTaken < maximumNumberOfSubsteps
  ) {
    time.accumulator -= fixedTimeStep;

    updatePrey({ commands, prey });

    numberOfSubstepsTaken += 1;
  }
};
