import { detectOverlap } from "../common/detect-overlap.js";
import { getRandomCommand } from "../common/get-random-command";
import type { OtherMovingThing } from "./OtherMovingThing.js";

export function updateOtherMovingThing(
  this: OtherMovingThing,
  { commands, deltaTime, otherMovingThings }: {
    commands: symbol[];
    deltaTime: number;
    otherMovingThings: OtherMovingThing[];
  },
) {
  const autopilotOn = this.autopilot === true;

  let randomCommand: symbol;

  if (autopilotOn) {
    randomCommand = getRandomCommand({ thing: this });
  }

  if (!this.movement.isMoving) {
    const [command] = autopilotOn ? [randomCommand] : commands;

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

    const willOverlap = detectOverlap({
      thing: this,
      thingList: otherMovingThings,
    });

    if (willOverlap === true) {
      this.position.target = { ...this.position.current };
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
      this.position.current.x = this.position.target.x;
      this.position.current.z = this.position.target.z;

      this.rendering.position.x = this.position.current.x;
      this.rendering.position.z = this.position.current.z;

      this.movement.isMoving = false;
    }
  }
}
