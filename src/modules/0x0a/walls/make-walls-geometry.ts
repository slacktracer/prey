import { BufferAttribute, BufferGeometry } from "three";

import type { MakeWallsGeometry } from "./types/MakeWallsGeometry.js";

export const makeWallsGeometry: MakeWallsGeometry = ({ wallsGeometryData }) => {
  const wallsGeometry = new BufferGeometry();

  const normalArray = new Float32Array(wallsGeometryData.normal.array);

  const positionArray = new Float32Array(wallsGeometryData.position.array);

  let indexArray = null;

  if (wallsGeometryData.index) {
    indexArray = new (
      positionArray.length / 3 > 65535 ? Uint32Array : Uint16Array
    )(wallsGeometryData.index.array);
  }

  wallsGeometry.setAttribute(
    "normal",
    new BufferAttribute(normalArray, wallsGeometryData.normal.itemSize),
  );

  wallsGeometry.setAttribute(
    "position",
    new BufferAttribute(positionArray, wallsGeometryData.position.itemSize),
  );

  if (indexArray) {
    wallsGeometry.setIndex(new BufferAttribute(indexArray, 1));
  }

  wallsGeometry.computeBoundingBox();

  wallsGeometry.computeBoundingSphere();

  return { wallsGeometry };
};
