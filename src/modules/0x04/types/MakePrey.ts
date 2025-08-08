import type { Group } from "three";

import type { MakeFin } from "./MakeFin.js";
import type { Prey } from "./Prey.js";

export type MakePrey = (
  input: Prey & {
    makeFin: MakeFin;
  },
) => Prey & {
  rendering: Group;
};
