import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";

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

  const groundPlaneMaterial = new MeshPhongMaterial({ color });

  const groundPlane = new Mesh(groundPlaneGeometry, groundPlaneMaterial);

  groundPlane.rotation.x = -Math.PI / 2;

  groundPlane.position.set(0, 0, 0);

  groundPlane.receiveShadow = true;

  return groundPlane;
};
