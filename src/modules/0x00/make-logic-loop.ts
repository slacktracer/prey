export const makeLogicLoop = ({
  fixedTimeStep,
  hopper,
  input,
  map,
  maximumNumberOfSubsteps,
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
      updateHopper({ hopper, input, map });

      time.accumulator -= fixedTimeStep;

      numberOfSubstepsTaken += 1;
    }
  };
};
