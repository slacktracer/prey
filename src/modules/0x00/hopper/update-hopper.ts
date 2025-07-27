import { Clock, MathUtils } from "three";

import type { Commands } from "../types/Commands";
import type { Hopper } from "../types/Hopper";
import { getForward } from "./get-forward";
import { hopperCommands } from "./hopper-commands";
import { isStepAllowed } from "./is-step-allowed";

let clock = new Clock(false);

export const updateHopper = ({
  commands,
  hopper,
  map,
}: {
  commands: Commands["hopper"];
  hopper: Hopper;
  map: number[][];
}) => {
  const command = commands.values().next().value;

  if (commands.size && hopper.moving === false) {
    switch (command) {
      case hopperCommands.backward:
        hopper.moving = true;

        hopper.rotation.target.z = hopper.rendering.rotation.z + Math.PI;

        break;

      case hopperCommands.left:
        hopper.moving = true;

        hopper.rotation.target.z = hopper.rendering.rotation.z + Math.PI / 2;

        break;

      case hopperCommands.right:
        hopper.moving = true;

        hopper.rotation.target.z = hopper.rendering.rotation.z + -(Math.PI / 2);

        break;

      case hopperCommands.forward:
        {
          const [axis, direction] = getForward({
            rotation: hopper.rendering.rotation.z,
          });

          hopper.position.target[axis] += direction;

          if (isStepAllowed({ hopper, map }) === false) {
            hopper.position.target[axis] -= direction;

            break;
          }
        }

        hopper.moving = true;

        break;

      default:
        console.warn("unknown command", command);
    }
  }

  if (!clock.running && hopper.moving) {
    clock.start();
  }

  const progress = Math.min(1, clock.getElapsedTime() / hopper.stepTime);

  hopper.rendering.position.x = MathUtils.lerp(
    hopper.rendering.position.x,
    hopper.position.target.x,
    progress,
  );

  hopper.rendering.position.y = MathUtils.lerp(
    hopper.rendering.position.y,
    hopper.position.target.y,
    progress,
  );

  hopper.rendering.rotation.z = MathUtils.lerp(
    hopper.rendering.rotation.z,
    hopper.rotation.target.z,
    progress,
  );

  if (progress >= 1) {
    hopper.moving = false;

    clock.stop();

    clock = new Clock(false);
  }
};
