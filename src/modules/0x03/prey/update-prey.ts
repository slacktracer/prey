import { Clock, MathUtils } from "three";

import { getForward } from "../../common/get-forward.js";
import { isMovementAllowed } from "./is-movement-allowed.js";

let movingClock = new Clock(false);

let rotatingClock = new Clock(false);

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

  if (prey.rotating === false && prey.moving === false) {
    if (commands.includes(preyCommands.forward)) {
      const [axis, direction] = getForward({
        rotation: prey.rendering.rotation.y,
      });

      const { x, y, z } = prey.position.target;

      const targetPosition = { x, y, z };

      targetPosition[axis] += direction;

      const movementIsAllowed = isMovementAllowed({
        map,
        targetPosition,
      });

      if (movementIsAllowed) {
        if (prey.moving === false) {
          prey.moving = true;

          movingClock.start();
        }

        prey.position.current = {
          x: prey.rendering.position.x,
          y: prey.rendering.position.y,
          z: prey.rendering.position.z,
        };

        prey.position.target = targetPosition;

        movingClock = new Clock();

        movingClock.start();
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
    rotatingClock.getElapsedTime() / prey.rotateTime,
  );

  prey.rendering.rotation.y = MathUtils.lerp(
    prey.rotation.current.y,
    prey.rotation.target.y,
    rotatingProgress,
  );

  if (movingProgress >= 1) {
    prey.position.current.x = prey.position.target.x;
    prey.position.current.z = prey.position.target.z;

    // Check if forward is still pressed for continuous movement
    if (commands.includes(preyCommands.forward) && prey.rotating === false) {
      const [axis, direction] = getForward({
        rotation: prey.rendering.rotation.y,
      });

      const { x, y, z } = prey.position.target;
      const targetPosition = { x, y, z };
      targetPosition[axis] += direction;

      const movementIsAllowed = isMovementAllowed({
        map,
        targetPosition,
      });

      if (movementIsAllowed) {
        // Continue movement seamlessly
        prey.position.target = targetPosition;
        movingClock = new Clock();
        movingClock.start();
      } else {
        // Stop movement if blocked
        prey.moving = false;
        movingClock.stop();
        movingClock = new Clock(false);
      }
    } else {
      // Stop movement if forward not pressed
      prey.moving = false;
      movingClock.stop();
      movingClock = new Clock(false);
    }
  }

  if (rotatingProgress >= 1) {
    prey.rotating = false;

    prey.rotation.current.y = prey.rotation.target.y;

    rotatingClock.stop();

    rotatingClock = new Clock(false);
  }
};
