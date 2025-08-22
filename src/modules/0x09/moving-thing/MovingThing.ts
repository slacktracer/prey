import type { Group } from "three";

import type { movingThingCommands } from "./moving-thing-commands.js";
import type { MovingThingRenderingSettings } from "./MovingThingRenderingSettings.js";

export type MovingThing = {
  commands: typeof movingThingCommands;

  movement: {
    animationDuration: number;
    animationTime: number;
    commandQueue: symbol[];
    isMoving: boolean;
  };

  place: { x: number[]; z: number[] };

  position: {
    current: { x: number; y: number; z: number };
    target: { x: number; y: number; z: number };
  };

  rendering: Group;

  renderingSettings: MovingThingRenderingSettings;

  update: (
    input: {
      commands: symbol[];
      deltaTime: number;
      otherMovingThing: MovingThing;
    },
  ) => void;
};
