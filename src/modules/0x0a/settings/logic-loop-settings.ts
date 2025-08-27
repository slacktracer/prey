import type { LogicLoopSettings } from "./types/LogicLoopSettings.js";

export const logicLoopSettings: LogicLoopSettings = {
  fixedTimeStep: 1 / 60,
  maximumNumberOfSubsteps: 5,
  time: { accumulator: 0 },
};
