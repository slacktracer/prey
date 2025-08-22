import { AmbientLight, Clock, Scene } from "three";

import { makeGroundPlane } from "./ground/make-ground-plane.js";
import { input } from "./input/input.js";
import { startCollectingInput } from "./input/start-collecting-input.js";
import { makeRunAnimationLoop } from "./loops/make-run-animation-loop.js";
import { makeRunLogicLoop } from "./loops/make-run-logic-loop.js";
import { makeOrthographicCamera } from "./make-orthographic-camera.js";
import { makeRenderer } from "./make-renderer.js";
import { makeMovingThing } from "./moving-thing/make-moving-thing.js";
import { orthographicCameraMovement } from "./orthographic-camera-movement.js";
import { makeOtherMovingThing } from "./other-moving-thing/make-other-moving-thing.js";
import { settings } from "./settings.js";
import type { Boot } from "./types/Boot.js";

const clock = new Clock();

export const boot: Boot = async ({ container }) => {
  const renderer = makeRenderer({ container });

  const scene = new Scene();

  const { orthographicCamera, orthographicCameraGroup } =
    makeOrthographicCamera({
      ...settings.orthographicCameraSettings,
      renderer,
    });

  scene.add(orthographicCameraGroup);

  const groundPlane = makeGroundPlane({ ...settings.groundPlaneSettings });

  scene.add(groundPlane);

  const movingThing = makeMovingThing({
    renderingSettings: {
      color: 0xf887c7,
      height: 2,
      side: 1,
    },
  });

  scene.add(movingThing.rendering);

  const otherMovingThings = [];

  const otherMovingThingsCount = 10;

  const startingI = 1;

  for (let i = startingI; i < otherMovingThingsCount + startingI; i += 1) {
    const { x, z } = getXZAround00(otherMovingThingsCount, i);

    const otherMovingThing = makeOtherMovingThing({
      position: { x, y: 0, z },

      renderingSettings: {
        color: 0x242c8542,
        height: 3,
        side: 2,
      },
    });

    scene.add(otherMovingThing.rendering);

    otherMovingThings.push(otherMovingThing);
  }

  startCollectingInput({ input });

  const runLogicLoop = makeRunLogicLoop({
    ...settings.logicLoopSettings,
    movingThing,
    otherMovingThings,
  });

  const runAnimationLoop = makeRunAnimationLoop({
    orthographicCamera,
    orthographicCameraGroup,
    orthographicCameraMovement,
    renderer,
    scene,
  });

  renderer.setAnimationLoop(() => {
    const deltaTime = clock.getDelta();

    runLogicLoop({ deltaTime: settings.logicLoopSettings.fixedTimeStep });

    runAnimationLoop({ deltaTime, movingThing });
  });

  if (settings.ambientLightSettings.on) {
    const ambientLight = new AmbientLight(
      settings.ambientLightSettings.color,
      settings.ambientLightSettings.intensity,
    );

    scene.add(ambientLight);
  }
};

function getXZAround00(count: number, i: number) {
  const angle = (i / count) * Math.PI * 2;

  const radius = 4;

  return {
    x: Math.round(Math.cos(angle) * radius),
    z: Math.round(Math.sin(angle) * radius),
  };
}
