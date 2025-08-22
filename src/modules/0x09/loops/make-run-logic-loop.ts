import { input } from "../input/input.js";
import { parseInput } from "../input/parse-input.js";
import type { MakeRunLogicLoop } from "../types/MakeRunLogicLoop.js";

export const makeRunLogicLoop: MakeRunLogicLoop = ({
  fixedTimeStep,
  maximumNumberOfSubsteps,
  movingThing,
  otherMovingThings,
  time,
}) =>
({ deltaTime }) => {
  const commands = parseInput({
    input,
    movingThingCommands: movingThing.commands,
  });

  time.accumulator += deltaTime;

  let numberOfSubstepsTaken = 0;

  while (
    time.accumulator >= fixedTimeStep &&
    numberOfSubstepsTaken < maximumNumberOfSubsteps
  ) {
    time.accumulator -= fixedTimeStep;

    movingThing.update({
      commands,
      deltaTime: fixedTimeStep,
      otherMovingThings,
    });

    otherMovingThings.forEach((otherMovingThing) => {
      otherMovingThing.update({ commands, deltaTime: fixedTimeStep });
    });

    numberOfSubstepsTaken += 1;
  }
};
