import { ConeGeometry, Mesh, MeshPhongMaterial } from "three";

export const makePointer = ({ color, depth, height, width }) => {
  const pointerGeometry = new ConeGeometry(width * 0.4, depth / 2, 64);

  const pointerMaterial = new MeshPhongMaterial({
    color,
    flatShading: true,
  });

  const pointer = new Mesh(pointerGeometry, pointerMaterial);

  pointer.rotation.z = -Math.PI / 2;

  pointer.position.set(
    depth * 0.6,
    height * 0.75,
    0,
  );

  return pointer;
};
