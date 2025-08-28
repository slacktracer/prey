import type { Group } from "three";

import type { PreySettings } from "../../settings/types/PreySettings.js";

export type MakePreyRendering = (
  input: Pick<PreySettings, "renderingSettings">,
) => Group;
