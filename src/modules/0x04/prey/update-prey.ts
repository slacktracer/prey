import { Clock, MathUtils } from "three";

import { getForward } from "../../common/get-forward";
import type { UpdatePrey } from "../types/UpdatePrey.js";

const rotatingClock = new Clock();

export const updatePrey: UpdatePrey = (
  { commands, deltaTime, prey, preyCommands },
) => {
  if (prey.rotating === false) {
    if (commands.includes(preyCommands.backward)) {
      prey.rotating = true;

      prey.rotation.target.y = prey.rendering.rotation.y + Math.PI;

      rotatingClock.start();
    }

    if (commands.includes(preyCommands.left)) {
      prey.rotating = true;

      prey.rotation.target.y = prey.rendering.rotation.y + Math.PI / 2;

      rotatingClock.start();
    }

    if (commands.includes(preyCommands.right)) {
      prey.rotating = true;

      prey.rotation.target.y = prey.rendering.rotation.y - Math.PI / 2;

      rotatingClock.start();
    }
  }

  if (prey.rotating) {
    const rotatingProgress = Math.min(
      1,
      rotatingClock.getElapsedTime() / prey.rotateTime,
    );

    prey.rendering.rotation.y = MathUtils.lerp(
      prey.rotation.current.y,
      prey.rotation.target.y,
      rotatingProgress,
    );

    if (rotatingProgress >= 1) {
      prey.rotating = false;

      prey.rotation.current.y = prey.rotation.target.y;

      rotatingClock.stop();
    }
  }

  let moveInput = 0;

  if (commands.includes(preyCommands.forward)) {
    moveInput += 1;
  }

  const [axis, direction] = getForward({
    rotation: prey.rendering.rotation.y,
  });
  const forward = {
    x: axis === "x" ? direction : 0,
    z: axis === "z" ? direction : 0,
  };

  // Calculate velocity and update position directly
  prey.velocity.x = forward.x * moveInput * prey.speed;
  prey.velocity.z = forward.z * moveInput * prey.speed;

  prey.position.x += prey.velocity.x * deltaTime;
  prey.position.z += prey.velocity.z * deltaTime;

  prey.rendering.position.x = prey.position.x;
  prey.rendering.position.y = prey.position.y;
  prey.rendering.position.z = prey.position.z;
};
