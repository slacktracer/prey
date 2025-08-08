import { AmbientLight, Group, Scene } from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

import { getBottomLeftRightTop } from "../common/get-bottom-left-right-top.js";
import { getRandomInteger } from "../common/get-random-integer.js";
import { makeOrthographicCameraResizeHandler } from "../common/make-ortographic-camera-resize-handler.js";
import { addCracksToTexture } from "./floor/add-cracks-to-texture.js";
import { addCracksToTextureFunctions } from "./floor/add-cracks-to-texture-functions.js";
import { makeGroundPlane } from "./floor/make-ground-plane.js";
import { makeGroundPlaneTexture } from "./floor/make-ground-plane-texture.js";
import { input } from "./input/input.js";
import { parseInput } from "./input/parse-input.js";
import { startCollectingInput } from "./input/start-collecting-input.js";
import { makeOrthographicCamera } from "./make-orthographic-camera.js";
import { makeRenderer } from "./make-renderer.js";
import { makeRunAnimationLoop } from "./make-run-animation-loop.js";
import { makeRunLogicLoop } from "./make-run-logic-loop.js";
import { isMapValid } from "./maps/is-map-valid.js";
import { makePointer } from "./prey/make-pointer.js";
import { makePrey } from "./prey/make-prey.js";
import { preyCommands } from "./prey/prey-commands.js";
import { updatePrey } from "./prey/update-prey.js";
import { state } from "./state.js";
import { addWallsToScene } from "./walls/add-walls-to-scene.js";

export const boot = async ({ container }: { container: HTMLDivElement }) => {
  const renderer = makeRenderer({ container });

  const scene = new Scene();

  const orthographicCamera = makeOrthographicCamera({
    ...state.orthographicCameraSettings,
    getBottomLeftRightTop,
    makeOrthographicCameraResizeHandler,
    renderer,
  });

  scene.add(orthographicCamera);

  const orthographicCameraGroup = new Group();

  orthographicCameraGroup.add(orthographicCamera);

  scene.add(orthographicCameraGroup);

  const groundPlane = makeGroundPlane({
    ...state.groundPlaneSettings,
    addCracksToTexture,
    addCracksToTextureFunctions,
    getRandomInteger,
    makeGroundPlaneTexture,
  });

  scene.add(groundPlane);

  const { map } = await import("./maps/map-with-exits.js");

  const mapIsValid = isMapValid({ map });

  if (mapIsValid === false) {
    throw new Error("Invalid map");
  }

  addWallsToScene({
    material: state.wallsSettings.material,
    map,
    scene,
    wallHeight: state.wallsSettings.height,
  });

  const prey = makePrey({
    ...state.prey,
    makePointer,
  });

  scene.add(prey.rendering);

  if (state.ambientLightSettings.on) {
    const ambientLight = new AmbientLight(
      state.ambientLightSettings.color,
      state.ambientLightSettings.intensity,
    );

    scene.add(ambientLight);
  }

  let controls;

  if (state.orbitControlsSettings.on) {
    controls = new OrbitControls(orthographicCamera, renderer.domElement);
  }

  const runAnimationLoop = makeRunAnimationLoop({
    controls,
    orthographicCamera,
    renderer,
    scene,
  });

  const runLogicLoop = makeRunLogicLoop({
    ...state.logicLoopSettings,
    input,
    parseInput,
    prey,
    preyCommands,
    updatePrey,
  });

  renderer.setAnimationLoop(() => {
    runLogicLoop();

    runAnimationLoop();
  });

  startCollectingInput({ input });
};
