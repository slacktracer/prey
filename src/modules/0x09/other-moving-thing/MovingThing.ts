import type { Group } from "three";

import type { movingThingCommands } from "./moving-thing-commands.js";

export type MovingThing = {
  commands: typeof movingThingCommands;

  movement: {
    animationDuration: number;
    animationTime: number;
    commandQueue: symbol[];
    isMoving: boolean;
  };

  position: {
    current: { x: number; y: number; z: number };
    target: { x: number; y: number; z: number };
  };

  rendering: Group;

  update: (input: { commands: symbol[]; deltaTime: number }) => void;
};
