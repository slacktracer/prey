import type { Group } from "three";

import type { MakePointer } from "./MakePointer.js";
import type { Prey } from "./Prey.js";

export type MakePrey = (
  input: Prey & {
    makePointer: MakePointer;
  },
) => Prey & {
  rendering: Group;
};
