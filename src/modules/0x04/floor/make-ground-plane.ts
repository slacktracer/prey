import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";

import { makeGroundPlaneTexture } from "./make-ground-plane-texture.js";

export const makeGroundPlane = ({
  color,
  cracks,
  height,
  width,
}: {
  color: number;
  cracks: boolean;
  width: number;
  height: number;
}) => {
  const groundPlaneGeometry = new PlaneGeometry(width, height);

  const groundPlaneTexture = makeGroundPlaneTexture({
    color,
    cracks,
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
