import { Mesh, MeshPhongMaterial } from "three";

export const makeWallsGivenGeometry = ({ wallsGeometry }) => {
  const wallsMaterial = new MeshPhongMaterial({
    color: 0x38393f,
    flatShading: true,
    transparent: true,
    opacity: 0.9,
  });

  const walls = new Mesh(wallsGeometry, wallsMaterial);

  walls.castShadow = true;

  walls.receiveShadow = true;

  return { walls };
};
