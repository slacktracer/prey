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
      depth: 0.5,
      height: 1,
      width: 0.5,
    },
  });

  scene.add(movingThing.rendering);

  startCollectingInput({ input });

  const runLogicLoop = makeRunLogicLoop({
    ...settings.logicLoopSettings,
    movingThing,
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
