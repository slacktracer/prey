import type { PreySettings } from "../../settings/types/PreySettings.js";
import type { Prey } from "./Prey.js";

export type MakePrey = (
  input: PreySettings,
) => Prey;
