import type { Group } from "three";

import type { MakePointer } from "./MakePointer.js";
import type { State } from "./State.js";

export type MakePrey = (
  input: State["prey"] & {
    makePointer: MakePointer;
  },
) => State["prey"] & {
  rendering: Group;
};
