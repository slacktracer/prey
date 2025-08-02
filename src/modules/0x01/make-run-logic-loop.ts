export const makeRunLogicLoop = ({
  fixedTimeStep,
  maximumNumberOfSubsteps,
  time,
}) =>
({ input, map, parseInput, prey, preyCommands, updatePrey }) => {
  const currentTime = performance.now();

  const frameDeltaTimeCap = fixedTimeStep * maximumNumberOfSubsteps;

  const frameDeltaTime = Math.min(
    currentTime - time.lastUpdateTime,
    frameDeltaTimeCap,
  );

  time.lastUpdateTime = currentTime;

  time.accumulator += frameDeltaTime;

  let numberOfSubstepsTaken = 0;

  while (
    time.accumulator >= fixedTimeStep &&
    numberOfSubstepsTaken < maximumNumberOfSubsteps
  ) {
    time.accumulator -= fixedTimeStep;

    const commands = parseInput({ input, preyCommands });

    updatePrey({ commands, map, prey, preyCommands });

    numberOfSubstepsTaken += 1;
  }
};
