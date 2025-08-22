import { makeMovingThingRendering } from "./make-moving-thing-rendering.js";
import { movingThingCommands } from "./moving-thing-commands.js";
import type { MovingThing } from "./MovingThing.js";
import type { MovingThingRenderingSettings } from "./MovingThingRenderingSettings.js";
import { updateMovingThing } from "./update-moving-thing.js";

export const makeOtherMovingThing = (
  { renderingSettings }: {
    renderingSettings: MovingThingRenderingSettings;
  },
): MovingThing => {
  const movingThing: MovingThing = {
    commands: movingThingCommands,

    movement: {
      animationDuration: 0.3,
      animationTime: 0,
      commandQueue: [],
      isMoving: false,
    },

    position: {
      current: { x: 0, y: 0, z: 0 },
      target: { x: 0, y: 0, z: 0 },
    },

    rendering: makeMovingThingRendering({ renderingSettings }),

    update: updateMovingThing,
  };

  return movingThing;
};
