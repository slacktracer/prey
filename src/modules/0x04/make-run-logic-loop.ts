import type { MakeRunLogicLoop } from "./types/MakeRunLogicLoop.js";

export const makeRunLogicLoop: MakeRunLogicLoop = ({
  fixedTimeStep,
  input,
  maximumNumberOfSubsteps,
  parseInput,
  prey,
  preyCommands,
  time,
  updatePrey,
}) =>
() => {
  time.lastUpdateTime ||= performance.now();

  const currentTime = performance.now();

  const frameDeltaTimeCap = fixedTimeStep * maximumNumberOfSubsteps;

  const frameDeltaTime = Math.min(
    currentTime - time.lastUpdateTime,
    frameDeltaTimeCap,
  );

  const commands = parseInput({ input, preyCommands });

  time.lastUpdateTime = currentTime;

  time.accumulator += frameDeltaTime;

  let numberOfSubstepsTaken = 0;

  while (
    time.accumulator >= fixedTimeStep &&
    numberOfSubstepsTaken < maximumNumberOfSubsteps
  ) {
    time.accumulator -= fixedTimeStep;

    updatePrey({ commands, prey, preyCommands });

    numberOfSubstepsTaken += 1;
  }
};
