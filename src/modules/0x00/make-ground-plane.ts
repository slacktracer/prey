import { Mesh, MeshPhongMaterial, PlaneGeometry } from "three";

export const makeGroundPlane = ({
  color,
  height,
  width,
}: {
  width: number;
  height: number;
  color: number | string;
}) => {
  const planeGeometry = new PlaneGeometry(width, height);

  const planeMaterial = new MeshPhongMaterial({ color: color });

  const plane = new Mesh(planeGeometry, planeMaterial);

  plane.rotation.x = -Math.PI / 2;

  plane.position.set(0, 0, 0);

  plane.receiveShadow = true;

  return plane;
};
