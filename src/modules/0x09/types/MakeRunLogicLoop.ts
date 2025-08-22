import type { MovingThing } from "../moving-thing/MovingThing.js";
import type { MovingThing as OtherMovingThing } from "../other-moving-thing/MovingThing.js";

export type MakeRunLogicLoop = (input: {
  fixedTimeStep: number;
  maximumNumberOfSubsteps: number;
  movingThing: MovingThing;
  otherMovingThing: OtherMovingThing;
  time: { accumulator: number };
}) => (input: { deltaTime: number }) => void;
