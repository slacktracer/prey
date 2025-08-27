import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";

import { makeGroundPlaneTexture } from "./make-ground-plane-texture.js";
import type { MakeGroundPlane } from "./types/MakeGroundPlane.js";

export const makeGroundPlane: MakeGroundPlane = ({
  color,
  depth,
  width,
}) => {
  const groundPlaneGeometry = new PlaneGeometry(width, depth);

  const groundPlaneTexture = makeGroundPlaneTexture({
    color,
    depth,
    width,
  });

  const groundPlaneMaterial = new MeshPhongMaterial({
    map: groundPlaneTexture,
  });

  // const groundPlaneMaterial = new MeshPhongMaterial({ color });

  const groundPlane = new Mesh(groundPlaneGeometry, groundPlaneMaterial);

  groundPlane.rotation.x = -Math.PI / 2;

  groundPlane.position.set(0, 0, 0);

  groundPlane.receiveShadow = true;

  return groundPlane;
};
