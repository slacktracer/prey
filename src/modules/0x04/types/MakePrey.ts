import type { Group } from "three";

import type { State } from "../state/State.js";
import type { MakePointer } from "./MakePointer.js";

export type MakePrey = (
  input: State["prey"] & {
    makePointer: MakePointer;
  },
) => State["prey"] & {
  rendering: Group;
};
