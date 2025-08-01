export const makeRunLogicLoop = ({
  fixedTimeStep,
  maximumNumberOfSubsteps,
  time,
}) =>
({ input, parseInput, prey, preyCommands, updatePrey }) => {
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

    updatePrey({ commands, prey, preyCommands });

    numberOfSubstepsTaken += 1;
  }
};
