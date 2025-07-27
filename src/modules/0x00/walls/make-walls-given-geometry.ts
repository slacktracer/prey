import { Mesh, MeshPhongMaterial } from "three";

import { state } from "../state/state.js";

export const makeWallsGivenGeometry = ({ wallsGeometry }) => {
  const wallsMaterial = new MeshPhongMaterial(state.wall.material);

  const walls = new Mesh(wallsGeometry, wallsMaterial);

  walls.castShadow = true;

  walls.receiveShadow = true;

  return { walls };
};
