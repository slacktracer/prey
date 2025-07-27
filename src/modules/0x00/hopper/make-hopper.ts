import { BoxGeometry, Group, Mesh, MeshPhongMaterial } from "three";

import { makePointLight } from "../make-point-light";
import type { Hopper } from "../types/Hopper";

export const makeHopper = (): Hopper => {
  const height = 2.5;

  const hopperRenderingGeometry = new BoxGeometry(0.75, 0.75, height);

  const hopperRenderingMaterial = new MeshPhongMaterial({
    color: "whitesmoke",
    flatShading: true,
  });

  const hopperRendering = new Mesh(
    hopperRenderingGeometry,
    hopperRenderingMaterial,
  );

  // hopperRendering.castShadow = true;

  hopperRendering.receiveShadow = true;

  hopperRendering.position.z += height / 2;

  const hopperRenderingGroup = new Group();

  hopperRenderingGroup.add(hopperRendering);

  const hopper = {
    height,
    moving: false,
    position: {
      cameraLagFactor: 0.5,
      current: { x: 0, y: 0, z: 0 },
      target: { x: 0, y: 0, z: 0 },
    },
    rendering: hopperRenderingGroup,
    rotation: {
      cameraLagFactor: 0.1,
      current: { x: 0, y: 0, z: 0 },
      target: { x: 0, y: 0, z: 0 },
    },
    stepTime: 0.2,
  };

  const pointLight = makePointLight();

  hopper.rendering.add(pointLight);

  return hopper;
};
