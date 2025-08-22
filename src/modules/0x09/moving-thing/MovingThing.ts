import type { Group } from "three";

import type { OtherMovingThing } from "../other-moving-thing/OtherMovingThing.js";
import type { movingThingCommands } from "./moving-thing-commands.js";
import type { MovingThingRenderingSettings } from "./MovingThingRenderingSettings.js";

export type MovingThing = {
  commands: typeof movingThingCommands;

  movement: {
    animationDuration: number;
    animationTime: number;
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
      otherMovingThings: OtherMovingThing[];
    },
  ) => void;
};
