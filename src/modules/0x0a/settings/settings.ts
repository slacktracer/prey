import { ambientLightSettings } from "./ambient-light-settings.js";
import { groundPlaneSettings } from "./ground-plane-settings.js";
import { logicLoopSettings } from "./logic-loop-settings.js";
import { orbitControlsSettings } from "./orbit-controls-settings.js";
import { orthographicCameraSettings } from "./orthographic-camera-settings.js";
import { otherSettings } from "./other-settings.js";
import { preySettings } from "./prey-settings.js";
import type { Settings } from "./types/Settings.js";
import { wallsSettings } from "./walls-settings.js";

export const settings: Settings = {
  ambientLightSettings,
  groundPlaneSettings,
  logicLoopSettings,
  orbitControlsSettings,
  orthographicCameraSettings,
  otherSettings,
  preySettings,
  wallsSettings,
};
