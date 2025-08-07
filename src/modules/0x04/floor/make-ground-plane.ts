import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";

import type { MakeGroundPlane } from "../types/MakeGroundPlane.js";

export const makeGroundPlane: MakeGroundPlane = ({
  addCracksToTexture,
  addCracksToTextureFunctions,
  color,
  cracks,
  getRandomInteger,
  height,
  makeGroundPlaneTexture,
  width,
}) => {
  const groundPlaneGeometry = new PlaneGeometry(width, height);

  const groundPlaneTexture = makeGroundPlaneTexture({
    addCracksToTexture,
    addCracksToTextureFunctions,
    color,
    cracks,
    getRandomInteger,
    height,
    width,
  });

  const groundPlaneMaterial = new MeshPhongMaterial({
    map: groundPlaneTexture,
  });

  const groundPlane = new Mesh(groundPlaneGeometry, groundPlaneMaterial);

  groundPlane.rotation.x = -Math.PI / 2;

  groundPlane.position.set(0, 0, 0);

  groundPlane.receiveShadow = true;

  return groundPlane;
};
