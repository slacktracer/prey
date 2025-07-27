export const makeLogicLoop = ({
  commands,
  fixedTimeStep,
  hopper,
  hopperCommands,
  input,
  map,
  maximumNumberOfSubsteps,
  parseInputIntoCommands,
  time,
  updateHopper,
}) => {
  return () => {
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
      parseInputIntoCommands({ commands, hopperCommands, input });

      updateHopper({ commands: commands.hopper, hopper, map });

      time.accumulator -= fixedTimeStep;

      numberOfSubstepsTaken += 1;
    }
  };
};
