import { AmbientLight, Scene } from "three";

import { makeGroundPlane } from "./make-ground-plane.js";
import { makeOrthographicCamera } from "./make-orthographic-camera";
import { makeRenderer } from "./make-renderer";
import { makeRunAnimationLoop } from "./make-run-animation-loop";
import { isMapValid } from "./maps/is-map-valid";
import { state } from "./state/state.js";
import { addWallsToScene } from "./walls/add-walls-to-scene";

export const boot = async ({ container }: { container: HTMLDivElement }) => {
  const renderer = makeRenderer({ container });

  state.orthographicCamera.renderer = renderer;

  const scene = new Scene();

  const orthographicCamera = makeOrthographicCamera(state.orthographicCamera);

  scene.add(orthographicCamera);

  const groundPlane = makeGroundPlane(state.groundPlane);

  scene.add(groundPlane);

  const { map } = await import("./maps/map.js");

  const mapIsValid = isMapValid({ map });

  if (mapIsValid === false) {
    throw new Error("Invalid map");
  }

  addWallsToScene({
    material: state.walls.material,
    map,
    scene,
    wallHeight: state.walls.height,
  });

  const runAnimationLoop = makeRunAnimationLoop({
    orthographicCamera,
    renderer,
    scene,
  });

  renderer.setAnimationLoop(() => {
    runAnimationLoop();
  });

  if (state.ambientLight.on) {
    const ambientLight = new AmbientLight(
      state.ambientLight.color,
      state.ambientLight.intensity,
    );

    scene.add(ambientLight);
  }
};
