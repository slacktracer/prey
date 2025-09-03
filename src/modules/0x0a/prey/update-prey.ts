import { MathUtils } from "three";

import { getForward } from "../../common/get-forward.js";
import type { UpdatePrey } from "./types/UpdatePrey.js";
import { updatePreyPhysics as updatePreyPhysicsUsingDynamicMode } from "./update-prey-physics/dynamic/update-prey-physics.js";
import { updatePreyPhysics as updatePreyPhysicsUsingManualMode } from "./update-prey-physics/manual/update-prey-physics.js";

export const updatePrey: UpdatePrey = ({ commands, deltaTime, prey }) => {
  if (prey.characterController.on === true) {
    if (prey.characterController.rotating === false) {
      if (commands.includes(prey.commands.backward)) {
        prey.characterController.rotation.target.y = prey.rendering.rotation.y +
          Math.PI;
      }

      if (commands.includes(prey.commands.left)) {
        prey.characterController.rotation.target.y = prey.rendering.rotation.y +
          Math.PI / 2;
      }

      if (commands.includes(prey.commands.right)) {
        prey.characterController.rotation.target.y = prey.rendering.rotation.y -
          Math.PI / 2;
      }

      if (
        commands.includes(prey.commands.backward) ||
        commands.includes(prey.commands.left) ||
        commands.includes(prey.commands.right)
      ) {
        prey.characterController.rotating = true;

        prey.characterController.rotation.timeElapsed = 0;

        prey.characterController.forward = getForward({
          rotation: prey.characterController.rotation.target.y,
        });
      }
    }

    if (prey.characterController.rotating === true) {
      prey.characterController.rotation.timeElapsed += deltaTime;

      const rotatingProgress = Math.min(
        1,
        prey.characterController.rotation.timeElapsed /
          prey.characterController.rotation.timeToComplete,
      );

      prey.rendering.rotation.y = MathUtils.lerp(
        prey.characterController.rotation.current.y,
        prey.characterController.rotation.target.y,
        rotatingProgress,
      );

      if (rotatingProgress >= 1) {
        prey.characterController.rotating = false;

        prey.characterController.rotation.current.y =
          prey.characterController.rotation.target.y;
      }
    }

    updatePreyPhysicsUsingManualMode({ commands, deltaTime, prey });
  } else {
    updatePreyPhysicsUsingDynamicMode({ commands, deltaTime, prey });
  }

  prey.position.previous.x = prey.position.current.x;

  prey.position.previous.z = prey.position.current.z;

  const translation = prey.physics.rigidBody.translation();

  prey.position.current.x = translation.x;

  prey.position.current.z = translation.z;
};
