import { BoxGeometry, InstancedMesh, Matrix4, MeshPhongMaterial } from "three";

export const makeWallsUsingInstancing = ({ map }) => {
  const wallHeight = 5;

  const wallGeometry = new BoxGeometry(1, 1, wallHeight);

  const wallMaterial = new MeshPhongMaterial({
    color: 0x38393f,
    flatShading: true,
  });

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
        dummy.setPosition(j - offsetX, i - offsetY, wallHeightOffset);

        walls.setMatrixAt(instanceIndex, dummy);

        instanceIndex += 1;
      }
    }
  }

  walls.instanceMatrix.needsUpdate = true;

  return { walls };
};
