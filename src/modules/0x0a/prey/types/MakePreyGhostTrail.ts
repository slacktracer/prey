import type { Scene } from "three";

import type { PreySettings } from "../../settings/types/PreySettings.js";

export type MakePreyGhostTrail = (input: {
  renderingSettings: PreySettings["renderingSettings"];
}) => {
  checkAndCreateGhost: (
    currentPosition: { x: number; y: number; z: number },
    currentRotation: { x: number; y: number; z: number },
    scene: Scene,
    trailDistance?: number,
  ) => void;
  updateGhostCopies: () => void;
};
