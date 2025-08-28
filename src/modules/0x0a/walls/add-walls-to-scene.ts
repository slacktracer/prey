import {
  BoxGeometry,
  InstancedMesh,
  Matrix4,
  Mesh,
  MeshPhongMaterial,
} from "three";

import { makeWallsGeometry } from "./make-walls-geometry.js";
import type { AddWallsToScene } from "./types/AddWallsToScene.js";

export const addWallsToScene: AddWallsToScene = async (
  { height, map, material, scene, world },
) => {
  const wallInstanceGeometry = new BoxGeometry(1, height, 1);

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

  const wallHeightOffset = height / 2;

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

        const {
          ColliderDesc,
          RigidBodyDesc,
        } = await import(
          "@dimforge/rapier3d"
        );

        const wallRigidBodyDescriptor = RigidBodyDesc.fixed()
          .setTranslation(wallInstanceX, wallInstanceY, wallInstanceZ);

        const wallRigidBody = world.createRigidBody(wallRigidBodyDescriptor);

        const wallColliderDesc = ColliderDesc.cuboid(0.5, height / 2, 0.5);

        world.createCollider(wallColliderDesc, wallRigidBody);

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

    console.warn("walls replaced");

    instancedWalls.geometry.dispose();

    instancedWalls.material.dispose();

    makeWallsGeometryDataUsingCSGWorker.terminate();
  };

  makeWallsGeometryDataUsingCSGWorker.postMessage({
    height,
    map,
    offsetX,
    offsetZ,
  });
};
