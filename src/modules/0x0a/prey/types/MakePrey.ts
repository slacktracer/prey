import type { World } from "@dimforge/rapier3d";

import type { PreySettings } from "../../settings/types/PreySettings.js";
import type { Prey } from "./Prey.js";

export type MakePrey = (
  input: PreySettings & { world: World },
) => Promise<Prey>;
