import { Clock, MathUtils } from "three";

import { getForward } from "../../common/get-forward.js";

let clock = new Clock(false);

export const updatePrey = ({ commands, prey, preyCommands }) => {
  if (prey.moving === false) {
    if (commands.includes(preyCommands.backward)) {
      prey.moving = true;

      prey.rotation.target.y = prey.rendering.rotation.y + Math.PI;
    }

    if (commands.includes(preyCommands.left)) {
      prey.moving = true;

      prey.rotation.target.y = prey.rendering.rotation.y + Math.PI / 2;
    }

    if (commands.includes(preyCommands.right)) {
      prey.moving = true;

      prey.rotation.target.y = prey.rendering.rotation.y - Math.PI / 2;
    }

    if (commands.includes(preyCommands.forward)) {
      const [axis, direction] = getForward({
        rotation: prey.rendering.rotation.y,
      });

      prey.moving = true;

      prey.position.target[axis] += direction;
    }
  }

  if (!clock.running && prey.moving) {
    clock.start();
  }

  const progress = Math.min(1, clock.getElapsedTime() / prey.stepTime);

  prey.rendering.position.x = MathUtils.lerp(
    prey.position.current.x,
    prey.position.target.x,
    progress,
  );

  prey.rendering.position.z = MathUtils.lerp(
    prey.position.current.z,
    prey.position.target.z,
    progress,
  );

  prey.rendering.rotation.y = MathUtils.lerp(
    prey.rotation.current.y,
    prey.rotation.target.y,
    progress,
  );

  if (progress >= 1) {
    prey.moving = false;

    prey.position.current.x = prey.position.target.x;

    prey.position.current.z = prey.position.target.z;

    prey.rotation.current.y = prey.rotation.target.y;

    clock.stop();

    clock = new Clock(false);
  }
};
