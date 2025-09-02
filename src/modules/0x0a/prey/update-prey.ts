import type { UpdatePrey } from "./types/UpdatePrey.js";
import { updatePreyPhysics as updatePreyPhysicsUsingDynamicMode } from "./update-prey-physics/dynamic/update-prey-physics.js";
import { updatePreyPhysics as updatePreyPhysicsUsingManualMode } from "./update-prey-physics/manual/update-prey-physics.js";

export const updatePrey: UpdatePrey = ({ commands, deltaTime, prey }) => {
  if (prey.characterController.on === true) {
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
