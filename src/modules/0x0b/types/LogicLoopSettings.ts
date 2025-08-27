export type LogicLoopSettings = {
  fixedTimeStep: number;
  maximumNumberOfSubsteps: number;
  time: { accumulator: number };
};
