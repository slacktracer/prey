import { doPlacesOverlap } from "../common/do-places-overlap.js";
import { getPlace } from "../common/get-place.js";
import type { MovingThing } from "./MovingThing.js";

export function updateMovingThing(
  this: MovingThing,
  { commands, deltaTime, otherMovingThing }: {
    commands: symbol[];
    deltaTime: number;
    otherMovingThing: MovingThing;
  },
) {
  if (!this.movement.isMoving) {
    const command = commands.shift();

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

    {
      const { x, z } = this.position.target;

      const side = this.renderingSettings.side;

      const willOverlap = doPlacesOverlap({
        placeA: getPlace({ side, x, z }),
        placeB: otherMovingThing.place,
      });

      if (willOverlap === true) {
        this.position.target = { ...this.position.current };
      }
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
        console.log("mt", this.position.target.x, this.position.target.z);

      this.position.current.x = this.position.target.x;
      this.position.current.z = this.position.target.z;

      this.rendering.position.x = this.position.current.x;
      this.rendering.position.z = this.position.current.z;

      this.movement.isMoving = false;
    }
  }
}
