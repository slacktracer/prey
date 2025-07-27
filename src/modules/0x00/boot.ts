import { Group, Scene } from "three";

import { makeOrthographicCameraResizeHandler } from "../common/make-ortographic-camera-resize-handler.js";
import { commands } from "./commands.js";
import { hopperCommands } from "./hopper/hopper-commands.js";
import { makeHopper } from "./hopper/make-hopper.js";
import { updateHopper } from "./hopper/update-hopper.js";
import { input } from "./input.js";
import { makeAnimationLoop } from "./make-animation-loop.js";
import { makeGroundPlane } from "./make-ground-plane.js";
import { makeLogicLoop } from "./make-logic-loop.js";
import { makeOrthographicCamera } from "./make-orthographic-camera.js";
import { makePointLight } from "./make-point-light.js";
import { makeRenderer } from "./make-renderer.js";
import { isMapValid } from "./maps/is-map-valid.js";
import { map } from "./maps/map.js";
import { parseInputIntoCommands } from "./parse-input-into-commands.js";
import { setUpOrbitControls } from "./set-up-orbit-controls.js";
import { startCollectingInput } from "./start-collecting-input.js";
import { addWallsToScene } from "./walls/add-walls-to-scene.js";

export const boot = ({
  container,
  orbitControlsOn = false,
}: {
  container: HTMLDivElement;
  orbitControlsOn: boolean;
}) => {
  const mapIsValid = isMapValid({ map });

  if (mapIsValid === false) {
    throw new Error("Invalid map");
  }

  const scene = new Scene();

  const groundPlane = makeGroundPlane({
    color: 0x303030,
    height: 150,
    width: 150,
  });

  scene.add(groundPlane);

  addWallsToScene({ map, scene });

  const edgeSize = 15;

  const orthographicCamera = makeOrthographicCamera({ edgeSize });

  scene.add(orthographicCamera);

  const orthographicCameraGroup = new Group();

  orthographicCameraGroup.add(orthographicCamera);

  scene.add(orthographicCameraGroup);

  const hopper = makeHopper();

  scene.add(hopper.rendering);

  const pointLight = makePointLight();

  hopper.rendering.add(pointLight);

  const renderer = makeRenderer({ container });

  let controls;

  if (orbitControlsOn === true) {
    controls = setUpOrbitControls({
      camera: orthographicCamera,
      renderer,
    });
  }

  const runLogicLoop = makeLogicLoop({
    commands,
    fixedTimeStep: 1000 / 30,
    hopper,
    hopperCommands,
    input,
    map,
    maximumNumberOfSubsteps: 5,
    parseInputIntoCommands,
    time: {
      accumulator: 0,
      lastUpdateTime: performance.now(),
    },
    updateHopper,
  });

  const runAnimationLoop = makeAnimationLoop({
    controls,
    hopper,
    orthographicCamera,
    orthographicCameraGroup,
    renderer,
    scene,
  });

  renderer.setAnimationLoop(() => {
    runLogicLoop();

    runAnimationLoop();
  });

  window.addEventListener(
    "resize",
    makeOrthographicCameraResizeHandler({
      edgeSize,
      orthographicCamera,
      renderer,
    }),
  );

  startCollectingInput({ input });
};
