import type { Prey } from "../../prey/types/Prey.js";

export type PreySettings = Pick<Prey, "physicsSettings" | "position"> & {
  renderingSettings: {
    candle: {
      color: number | string;

      decay: number;

      distance: number;

      intensity: number;

      yOffset: number;
    };

    color: number | string;

    depth: number;

    height: number;

    width: number;
  };
};
