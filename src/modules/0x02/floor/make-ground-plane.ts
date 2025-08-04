import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";

import { makeGroundPlaneTexture as makeTexture1 } from "./make-ground-plane-texture-1.js";
import { makeGroundPlaneTexture as makeTexture2 } from "./make-ground-plane-texture-2.js";

export const makeGroundPlane = ({
  color,
  height,
  width,
}: {
  color: number;
  width: number;
  height: number;
}) => {
  const groundPlaneGeometry = new PlaneGeometry(width, height);

  const textures = [makeTexture1, makeTexture2];

  const randomTexture = textures[Math.floor(Math.random() * 2)];

  const groundPlaneTexture = randomTexture({ color, height, width });

  const groundPlaneMaterial = new MeshPhongMaterial({
    map: groundPlaneTexture,
  });

  const groundPlane = new Mesh(groundPlaneGeometry, groundPlaneMaterial);

  groundPlane.rotation.x = -Math.PI / 2;

  groundPlane.position.set(0, 0, 0);

  groundPlane.receiveShadow = true;

  return groundPlane;
};
