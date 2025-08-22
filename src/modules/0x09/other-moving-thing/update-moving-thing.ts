import { getRandomInteger } from "../../common/get-random-integer.js";
import type { MovingThing } from "./MovingThing.js";

export function updateMovingThing(
  this: MovingThing,
  { /*commands, */ deltaTime }: {
    commands: symbol[];
    deltaTime: number;
  },
) {
  if (!this.movement.isMoving) {
    // let command = commands.shift();

    const movingThingCommands = Object.values(this.commands);

    const movingThingCommand = movingThingCommands[
      getRandomInteger({ max: movingThingCommands.length - 1, min: 0 })
    ];

    const command = Math.random() < 0.05 ? movingThingCommand : undefined;

    switch (command) {
      case this.commands.forward:
        this.position.target.x -= 1;

        this.movement.animationTime = 0;

        this.movement.isMoving = true;

        break;

      case this.commands.backward:
        this.position.target.x += 1;

        this.movement.animationTime = 0;

        this.movement.isMoving = true;

        break;

      case this.commands.left:
        this.position.target.z += 1;

        this.movement.animationTime = 0;

        this.movement.isMoving = true;

        break;

      case this.commands.right:
        this.position.target.z -= 1;

        this.movement.animationTime = 0;

        this.movement.isMoving = true;

        break;
    }
  }

  if (this.movement.isMoving) {
    this.movement.animationTime += deltaTime;

    const progress = Math.min(
      this.movement.animationTime / this.movement.animationDuration,
      1,
    );

    const easeOutProgress = 1 - Math.pow(1 - progress, 3);

    this.rendering.position.x = this.position.current.x +
      (this.position.target.x - this.position.current.x) * easeOutProgress;

    this.rendering.position.z = this.position.current.z +
      (this.position.target.z - this.position.current.z) * easeOutProgress;

    if (progress >= 1) {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      ((this.position.current.x !== this.position.target.x) ||
        (this.position.current.z !== this.position.target.z)) &&
        console.log("other mt", this.position.target.x, this.position.target.z);

      this.position.current.x = this.position.target.x;
      this.position.current.z = this.position.target.z;

      this.rendering.position.x = this.position.current.x;
      this.rendering.position.z = this.position.current.z;

      this.movement.isMoving = false;
    }
  }
}
