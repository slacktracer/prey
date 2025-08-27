import { getPlace } from "../common/get-place.js";
import { makeMovingThingRendering } from "./make-moving-thing-rendering.js";
import { movingThingCommands } from "./moving-thing-commands.js";
import type { MovingThing } from "./MovingThing.js";
import type { MovingThingRenderingSettings } from "./MovingThingRenderingSettings.js";
import { updateMovingThing } from "./update-moving-thing.js";

let id = 0;

export const makeMovingThing = (
  { renderingSettings }: {
    renderingSettings: MovingThingRenderingSettings;
  },
): MovingThing => {
  const movingThing: MovingThing = {
    autopilot: false,

    commands: movingThingCommands,

    id: `MT_${id += 1}`,

    movement: {
      animationDuration: 0.3,
      animationTime: 0,
      isMoving: false,
    },

    get place() {
      return getPlace({
        side: this.renderingSettings.side,
        x: this.position.current.x,
        z: this.position.current.z,
      });
    },

    position: {
      current: { x: 0, y: 0, z: 0 },
      target: { x: 0, y: 0, z: 0 },
    },

    rendering: makeMovingThingRendering({ renderingSettings }),

    renderingSettings,

    update: updateMovingThing,
  };

  return movingThing;
};
