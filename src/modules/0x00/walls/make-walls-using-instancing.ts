import { BoxGeometry, InstancedMesh, Matrix4, MeshPhongMaterial } from "three";

import { state } from "../state/state.js";

export const makeWallsUsingInstancing = ({ map }) => {
  const wallHeight = state.wall.height;

  const wallGeometry = new BoxGeometry(1, wallHeight, 1);

  const wallMaterial = new MeshPhongMaterial(state.wall.material);

  let instanceCount = 0;

  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      if (map[i][j] === 1) {
        instanceCount += 1;
      }
    }
  }

  const walls = new InstancedMesh(wallGeometry, wallMaterial, instanceCount);

  walls.castShadow = true;

  walls.receiveShadow = true;

  // offsets to centre
  const offsetX = map[0].length / 2 - 0.5;

  const offsetY = map.length / 2 - 0.5;

  const wallHeightOffset = wallHeight / 2;

  const dummy = new Matrix4();

  let instanceIndex = 0;

  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      if (map[i][j] === 1) {
        dummy.setPosition(j - offsetX, wallHeightOffset, i - offsetY);

        walls.setMatrixAt(instanceIndex, dummy);

        instanceIndex += 1;
      }
    }
  }

  walls.instanceMatrix.needsUpdate = true;

  return { walls };
};
