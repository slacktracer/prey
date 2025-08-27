import type { Group } from "three";

import type { otherMovingThingCommands } from "./other-moving-thing-commands.js";
import type { OtherMovingThingRenderingSettings } from "./OtherMovingThingRenderingSettings.js";

export type OtherMovingThing = {
  autopilot: boolean;

  commands: typeof otherMovingThingCommands;

  id: string;

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

  renderingSettings: OtherMovingThingRenderingSettings;

  update: (
    input: {
      commands: symbol[];
      deltaTime: number;
      otherMovingThings: OtherMovingThing[];
    },
  ) => void;
};
