import {
  BoxGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
} from "three";

import { makeWallsGeometry } from "./make-walls-geometry.js";

export const addWallsToScene = ({ material, map, scene, wallHeight }) => {
  const wallInstanceGeometry = new BoxGeometry(1, wallHeight, 1);

  const wallInstanceMaterial = new MeshPhongMaterial(material);

  let wallInstanceCount = 0;

  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      if (map[i][j] === 1) {
        wallInstanceCount += 1;
      }
    }
  }

  const instancedWalls = new InstancedMesh(
    wallInstanceGeometry,
    wallInstanceMaterial,
    wallInstanceCount,
  );

  instancedWalls.castShadow = true;

  instancedWalls.receiveShadow = true;

  const offsetX = map[0].length / 2 - 0.5;

  const offsetZ = map.length / 2 - 0.5;

  const wallHeightOffset = wallHeight / 2;

  const dummyWallInstance = new Matrix4();

  let wallInstanceIndex = 0;

  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      if (map[i][j] === 1) {
        const wallInstanceX = j - offsetX;

        const wallInstanceY = wallHeightOffset;

        const wallInstanceZ = i - offsetZ;

        dummyWallInstance.setPosition(
          wallInstanceX,
          wallInstanceY,
          wallInstanceZ,
        );

        instancedWalls.setMatrixAt(wallInstanceIndex, dummyWallInstance);

        wallInstanceIndex += 1;
      }
    }
  }

  instancedWalls.instanceMatrix.needsUpdate = true;

  scene.add(instancedWalls);

  const makeWallsGeometryDataUsingCSGWorker = new Worker(
    new URL("./make-walls-geometry-data-using-csg-worker.ts", import.meta.url),
    { type: "module" },
  );

  makeWallsGeometryDataUsingCSGWorker.onmessage = (event) => {
    const { wallsGeometryData } = event.data;

    const { wallsGeometry } = makeWallsGeometry({ wallsGeometryData });

    const wallsMaterial = new MeshPhongMaterial(material);

    const walls = new Mesh(wallsGeometry, wallsMaterial);

    walls.castShadow = true;

    walls.receiveShadow = true;

    scene.remove(instancedWalls);

    scene.add(walls);

    instancedWalls.geometry.dispose();

    instancedWalls.material.dispose();

    makeWallsGeometryDataUsingCSGWorker.terminate();
  };

  makeWallsGeometryDataUsingCSGWorker.postMessage({
    map,
    offsetX,
    offsetZ,
    wallHeight,
  });
};
