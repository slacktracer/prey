import type { UpdateBrute } from "../types/UpdateBrute.js";
// temp code to try something
import { bruteCommands } from "./brute-commands.js";

const bruteCommandsList = [
  bruteCommands.backward,
  bruteCommands.forward,
  bruteCommands.left,
  bruteCommands.right,
];

const defaultCommands = [bruteCommands.backward];

export const updateBrute: UpdateBrute = (
  { brute, bruteCommands, /*commands,*/ deltaTime },
) => {
  const movement = { x: 0, y: 0, z: 0 };

  if (defaultCommands.includes(bruteCommands.backward)) {
    movement.x = -brute.speed * deltaTime;
  }

  if (defaultCommands.includes(bruteCommands.forward)) {
    movement.x = brute.speed * deltaTime;
  }

  if (defaultCommands.includes(bruteCommands.left)) {
    movement.z = brute.speed * deltaTime;
  }

  if (defaultCommands.includes(bruteCommands.right)) {
    movement.z = -brute.speed * deltaTime;
  }

  if (movement.x !== 0 || movement.z !== 0) {
    brute.physics.characterController.computeColliderMovement(
      brute.physics.collider,
      movement,
    );

    brute.position.previous = brute.physics.rigidBody.translation();

    const correctedMovement = brute.physics.characterController
      .computedMovement();

    const currentPosition = brute.physics.rigidBody.translation();

    brute.physics.rigidBody.setTranslation({
      x: currentPosition.x + correctedMovement.x,
      y: currentPosition.y + correctedMovement.y,
      z: currentPosition.z + correctedMovement.z,
    }, true);
  }

  brute.position.current = brute.physics.rigidBody.translation();

  // temp code to try something
  const numberOfCollisions = brute.physics.characterController
    .numComputedCollisions();

  if (numberOfCollisions > 0) {
    for (let i = 0; i < numberOfCollisions; i += 1) {
      const collision = brute.physics.characterController.computedCollision(i);

      if (collision) {
        const { collider } = collision;

        if (collider) {
          const x = bruteCommandsList.findIndex((item) =>
            item === defaultCommands[0]
          ) + 1;
          defaultCommands[0] = bruteCommandsList[x];
          // console.info(collider.handle);
        }
      }
    }
  }
};
