import type { AmbientLightSettings } from "./AmbientLightSettings.js";
import type { BruteSettings } from "./BruteSettings";
import type { GroundPlaneSettings } from "./GroundPlaneSettings.js";
import type { LogicLoopSettings } from "./LogicLoopSettings.js";
import type { PerspectiveCameraSettings } from "./PerspectiveCameraSettings.js";
import type { PreySettings } from "./PreySettings.js";
import type { WallsSettings } from "./WallsSettings.js";

export type Settings = {
  ambientLightSettings: AmbientLightSettings;
  bruteSettings: BruteSettings;
  groundPlaneSettings: GroundPlaneSettings;
  logicLoopSettings: LogicLoopSettings;
  perspectiveCameraSettings: PerspectiveCameraSettings;
  preySettings: PreySettings;
  wallsSettings: WallsSettings;
};
