import { Clock, MathUtils } from "three";

import { preyCommands } from "./prey-commands";

const rotatingClock = new Clock();

export const updatePrey = ({ commands, prey }) => {
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
};
