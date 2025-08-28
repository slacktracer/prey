import type { AmbientLightSettings } from "./AmbientLightSettings.js";
import type { GroundPlaneSettings } from "./GroundPlaneSettings.js";
import type { LogicLoopSettings } from "./LogicLoopSettings.js";
import type { OrthographicCameraSettings } from "./OrthographicCameraSettings.js";
import type { PreySettings } from "./PreySettings.js";

export type Settings = {
  ambientLightSettings: AmbientLightSettings;
  groundPlaneSettings: GroundPlaneSettings;
  logicLoopSettings: LogicLoopSettings;
  orthographicCameraSettings: OrthographicCameraSettings;
  preySettings: PreySettings;
};
