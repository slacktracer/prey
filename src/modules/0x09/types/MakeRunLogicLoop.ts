import type { MovingThing } from "../moving-thing/MovingThing.js";

export type MakeRunLogicLoop = (input: {
  fixedTimeStep: number;
  maximumNumberOfSubsteps: number;
  movingThing: MovingThing;
  otherMovingThing: MovingThing;
  time: { accumulator: number };
}) => (input: { deltaTime: number }) => void;
