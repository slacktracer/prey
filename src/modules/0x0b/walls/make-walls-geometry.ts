import { BufferAttribute, BufferGeometry } from "three";

import type { MakeWallsGeometry } from "../types/MakeWallsGeometry.js";

export const makeWallsGeometry: MakeWallsGeometry = ({ wallsGeometryData }) => {
  const wallsGeometry = new BufferGeometry();

  const normalArray = new Float32Array(wallsGeometryData.normal.array);

  const positionArray = new Float32Array(wallsGeometryData.position.array);

  let indexArray = null;

  if (wallsGeometryData.index) {
    // --- IMPORTANT: Selecting the correct TypedArray for the Index Buffer ---
    // WebGL (and thus Three.js) requires index buffers to be either Uint16Array
    // or Uint32Array, depending on the maximum index value needed.
    //
    // A Uint16Array can reference up to 65,536 vertices (indices 0 to 65535).
    // If the geometry has more than 65,536 vertices, a Uint32Array is required.
    //
    // The heuristic used here checks the total number of vertices
    // (positionArray.length / 3, as each vertex has 3 components: x, y, z).
    // If the number of vertices exceeds 65,535, we use Uint32Array; otherwise, Uint16Array.
    // This ensures the index buffer can correctly reference all vertices.
    //
    // For more details, refer to the Three.js BufferGeometry documentation on indices:
    // https://threejs.org/docs/#api/en/core/BufferGeometry.setIndex
    //
    // Also, WebGL specification on `drawElements`:
    // https://developer.mozilla.org/en-US/docs/Web/API/WebGLRenderingContext/drawElements#parameters
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
