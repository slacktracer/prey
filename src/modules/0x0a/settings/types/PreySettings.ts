import type { Prey } from "../../prey/types/Prey.js";

export type PreySettings = Pick<Prey, "physicsSettings" | "position"> & {
  renderingSettings: {
    candle: {
      color: number | string;

      yOffset: number;
    };

    color: number | string;

    depth: number;

    height: number;

    width: number;
  };
};
