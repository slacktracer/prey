import { multiplyVector } from "../common/multiply-vector.js";
import { rotateVector } from "../common/rotate-vector.js";
import type { UpdatePrey } from "./types/UpdatePrey.js";

export const updatePrey: UpdatePrey = ({ commands, prey }) => {
  prey.physics.rigidBody.resetForces(true);

  prey.physics.rigidBody.resetTorques(true);

  if (commands.includes(prey.commands.left)) {
    prey.physics.rigidBody.addTorque({
      x: 0,
      y: prey.physicsSettings.torque,
      z: 0,
    }, true);
  }

  if (commands.includes(prey.commands.right)) {
    prey.physics.rigidBody.addTorque({
      x: 0,
      y: -prey.physicsSettings.torque,
      z: 0,
    }, true);
  }

  if (commands.includes(prey.commands.forward)) {
    const rotation = prey.physics.rigidBody.rotation();

    const forward = rotateVector({
      quaternion: rotation,

      vector: { x: 1, y: 0, z: 0 },
    });

    const force = multiplyVector({
      scalar: prey.physicsSettings.forwardForceMultiplier,
      vector: forward,
    });

    prey.physics.rigidBody.addForce(force, true);
  }

  if (commands.includes(prey.commands.backward)) {
    const rotation = prey.physics.rigidBody.rotation();

    const backward = rotateVector({
      quaternion: rotation,

      vector: { x: -1, y: 0, z: 0 },
    });

    const force = multiplyVector({
      scalar: prey.physicsSettings.backwardForceMultiplier,
      vector: backward,
    });

    prey.physics.rigidBody.addForce(force, true);
  }

  prey.position.previous.x = prey.position.current.x;

  prey.position.previous.z = prey.position.current.z;

  const translation = prey.physics.rigidBody.translation();

  prey.position.current.x = translation.x;

  prey.position.current.z = translation.z;
};
