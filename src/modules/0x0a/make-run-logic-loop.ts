import { parseInput } from "./input/parse-input.js";
import type { MakeRunLogicLoop } from "./types/MakeRunLogicLoop.js";

export const makeRunLogicLoop: MakeRunLogicLoop = ({
  fixedTimeStep,
  input,
  maximumNumberOfSubsteps,
  time,
  // world,
}) =>
({ deltaTime }) => {
  /*const commands = */ parseInput({ input, preyCommands: { key: Symbol() } });

  time.accumulator += deltaTime;

  let numberOfSubstepsTaken = 0;

  while (
    time.accumulator >= fixedTimeStep &&
    numberOfSubstepsTaken < maximumNumberOfSubsteps
  ) {
    time.accumulator -= fixedTimeStep;

    // world.step();

    numberOfSubstepsTaken += 1;
  }
};
