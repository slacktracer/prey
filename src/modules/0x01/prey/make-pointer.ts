import { ConeGeometry, Mesh, MeshPhongMaterial } from "three";

export const makePointer = ({ color, height, width }) => {
  const pointerGeometry = new ConeGeometry(width / 3, height / 8);

  const pointerMaterial = new MeshPhongMaterial({
    color,
    flatShading: true,
  });

  const pointer = new Mesh(pointerGeometry, pointerMaterial);

  pointer.rotation.z = Math.PI / 2;

  const pointerHeight = pointerGeometry.parameters.height;

  pointer.position.set(
    width / 2 + 0.1,
    height / 2 + pointerHeight / 2 + 0.1,
    0,
  );

  return pointer;
};
