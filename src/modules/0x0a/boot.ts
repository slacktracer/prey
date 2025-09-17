import { AmbientLight, Clock, Scene } from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

import { makeOrthographicCamera } from "./camera/make-orthographic-camera.js";
import { makeChannel } from "./channel/channel";
import { makeGroundPlane } from "./ground/make-ground-plane.js";
import { input } from "./input/input.js";
import { startCollectingInput } from "./input/start-collecting-input.js";
import { makeRenderer } from "./make-renderer.js";
import { makeRunAnimationLoop } from "./make-run-animation-loop.js";
import { makeRunLogicLoop } from "./make-run-logic-loop.js";
import { isMapValid } from "./maps/is-map-valid.js";
import { makePrey } from "./prey/make-prey.js";
import type { Prey } from "./prey/types/Prey";
import { settings } from "./settings/settings.js";
import type { Boot } from "./types/Boot.js";
import { addWallsToScene } from "./walls/add-walls-to-scene.js";

const clock = new Clock();

export const boot: Boot = async ({ container, isOther }) => {
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

  const { map } = await import("./maps/map-with-exits.js");

  const mapIsValid = isMapValid({ map });

  if (mapIsValid === false) {
    throw new Error("Invalid map");
  }

  const { World } = await import("@dimforge/rapier3d");

  const world = new World({ x: 0, y: 0, z: 0 });

  world.timestep = settings.logicLoopSettings.fixedTimeStep;

  await addWallsToScene({
    ...settings.wallsSettings,
    map,
    scene,
    world,
  });

  let prey;

  if (!isOther) {
    prey = await makePrey({ ...settings.preySettings, world });

    scene.add(prey.rendering);
  }

  let other: Prey;

  const runLogicLoop = makeRunLogicLoop({
    ...settings.logicLoopSettings,
    input,
    otherControlled: isOther,
    prey,
    world,
  });

  const channel = await makeChannel();

  const runAnimationLoop = makeRunAnimationLoop({
    channel,
    isOther,
    orthographicCamera,
    orthographicCameraGroup,
    other,
    prey,
    renderer,
    scene,
  });

  renderer.setAnimationLoop(() => {
    runLogicLoop({ deltaTime: clock.getDelta(), other });

    const excessTime = settings.logicLoopSettings.time.accumulator;

    const { fixedTimeStep } = settings.logicLoopSettings;

    const interpolationFactor = excessTime / fixedTimeStep;

    runAnimationLoop({ interpolationFactor });
  });

  startCollectingInput({ input });

  if (settings.ambientLightSettings.on) {
    const ambientLight = new AmbientLight(
      settings.ambientLightSettings.color,
      settings.ambientLightSettings.intensity,
    );

    scene.add(ambientLight);
  }

  if (settings.orbitControlsSettings.on) {
    new OrbitControls(orthographicCamera, renderer.domElement);
  }

  const setUpOther = async ({ type }) => {
    if (type === "enter-other") {
      other = await makePrey({ ...settings.otherSettings, world });

      scene.add(other.rendering);

      channel.emit("chat message", { type: "enter-prey" });
    }

    if (type === "enter-prey" && isOther) {
      prey = await makePrey({ ...settings.preySettings, world });

      scene.add(prey.rendering);
    }
  };

  channel.emit("chat message", { id: Math.random() });

  if (isOther) {
    channel.emit("chat message", { type: "enter-other" });
  }

  channel.on("chat message", async (data) => {
    if (data.type === "prey-move" && isOther) {
      console.log(data.position);

      if (prey && data.position) {
        prey.position.current.x = data.position.x;
        prey.position.current.y = data.position.y;
        prey.position.current.z = data.position.z;
      }
    } else {
      setUpOther(data);
    }
  });
};
