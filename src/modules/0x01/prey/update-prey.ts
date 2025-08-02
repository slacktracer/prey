import { Clock, MathUtils } from "three";

import { getForward } from "../../common/get-forward.js";
import { isMovementAllowed } from "./is-movement-allowed.js";

let rotatingClock = new Clock(false);

let movingClock = new Clock(false);

export const updatePrey = ({ commands, map, prey, preyCommands }) => {
  if (prey.rotating === false) {
    if (commands.includes(preyCommands.backward)) {
      prey.rotating = true;

      prey.rotation.target.y = prey.rendering.rotation.y + Math.PI;
    }

    if (commands.includes(preyCommands.left)) {
      prey.rotating = true;

      prey.rotation.target.y = prey.rendering.rotation.y + Math.PI / 2;
    }

    if (commands.includes(preyCommands.right)) {
      prey.rotating = true;

      prey.rotation.target.y = prey.rendering.rotation.y - Math.PI / 2;
    }
  }

  if (prey.moving === false) {
    if (commands.includes(preyCommands.forward)) {
      const [axis, direction] = getForward({
        rotation: prey.rendering.rotation.y,
      });

      const { x, y, z } = prey.position.current;

      const targetPosition = { x, y, z };

      targetPosition[axis] += direction;

      const movementIsAllowed = isMovementAllowed({
        map,
        targetPosition,
      });

      if (movementIsAllowed) {
        prey.moving = true;

        prey.position.target = targetPosition;
      }
    }
  }

  if (!movingClock.running && prey.moving) {
    movingClock.start();
  }

  if (!rotatingClock.running && prey.rotating) {
    rotatingClock.start();
  }

  const movingProgress = Math.min(
    1,
    movingClock.getElapsedTime() / prey.moveTime,
  );

  prey.rendering.position.x = MathUtils.lerp(
    prey.position.current.x,
    prey.position.target.x,
    movingProgress,
  );

  prey.rendering.position.z = MathUtils.lerp(
    prey.position.current.z,
    prey.position.target.z,
    movingProgress,
  );

  const rotatingProgress = Math.min(
    1,
    rotatingClock.getElapsedTime() / prey.moveTime,
  );

  prey.rendering.rotation.y = MathUtils.lerp(
    prey.rotation.current.y,
    prey.rotation.target.y,
    rotatingProgress,
  );

  if (movingProgress >= 1) {
    prey.moving = false;

    prey.position.current.x = prey.position.target.x;

    prey.position.current.z = prey.position.target.z;

    movingClock.stop();

    movingClock = new Clock(false);
  }

  if (rotatingProgress >= 1) {
    prey.rotating = false;

    prey.rotation.current.y = prey.rotation.target.y;

    rotatingClock.stop();

    rotatingClock = new Clock(false);
  }
};
