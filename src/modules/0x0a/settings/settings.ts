import { ambientLightSettings } from "./ambient-light-settings.js";
import { groundPlaneSettings } from "./ground-plane-settings.js";
import { logicLoopSettings } from "./logic-loop-settings.js";
import { orthographicCameraSettings } from "./orthographic-camera-settings.js";
import type { Settings } from "./types/Settings.js";

export const settings: Settings = {
  ambientLightSettings,
  groundPlaneSettings,
  logicLoopSettings,
  orthographicCameraSettings,
};
