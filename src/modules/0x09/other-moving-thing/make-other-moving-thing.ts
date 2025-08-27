import { getPlace } from "../common/get-place.js";
import { makeOtherMovingThingRendering } from "./make-other-moving-thing-rendering.js";
import { otherMovingThingCommands } from "./other-moving-thing-commands.js";
import type { OtherMovingThing } from "./OtherMovingThing.js";
import type { OtherMovingThingRenderingSettings } from "./OtherMovingThingRenderingSettings.js";
import { updateOtherMovingThing } from "./update-other-moving-thing.js";

let id = 0;

export const makeOtherMovingThing = (
  { autopilot, position, renderingSettings }: {
    autopilot: boolean;
    position: { x: number; y: number; z: number };
    renderingSettings: OtherMovingThingRenderingSettings;
  },
): OtherMovingThing => {
  const otherMovingThing: OtherMovingThing = {
    autopilot,

    commands: otherMovingThingCommands,

    id: `OMT_${id += 1}`,

    movement: {
      animationDuration: 0.9,
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
      current: { ...position },
      target: { ...position },
    },

    rendering: makeOtherMovingThingRendering({
      position,
      renderingSettings,
    }),

    renderingSettings,

    update: updateOtherMovingThing,
  };

  return otherMovingThing;
};
