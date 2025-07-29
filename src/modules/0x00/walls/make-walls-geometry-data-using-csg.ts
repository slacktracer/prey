import { BoxGeometry, Mesh } from "three";
import { ADDITION, Brush, Evaluator } from "three-bvh-csg";

import { state } from "../state/state.js";

export const makeWallsGeometryDataUsingCSG = ({ map }) => {
  const wallHeight = state.wall.height;

  const offsetX = map[0].length / 2 - 0.5;

  const offsetY = map.length / 2 - 0.5;

  const wallHeightOffset = wallHeight / 2;

  const csgEvaluator = new Evaluator();

  csgEvaluator.attributes = ["position", "normal"];

  const brushes = [];

  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      if (map[i][j] === 1) {
        const wallBlockGeometry = new BoxGeometry(1, wallHeight, 1);

        const brush = new Brush(wallBlockGeometry);

        brush.position.set(j - offsetX, wallHeightOffset, i - offsetY);

        brush.updateMatrixWorld(true);

        brushes.push(brush);
      }
    }
  }

  let geometry = null;

  const geometriesToDispose = [];

  let currentResultBrush = brushes[0];

  // I must be able to make it a forEach or use for everywhere else.
  // See no reason to mix and match.
  for (let i = 1; i < brushes.length; i += 1) {
    const nextBrush = brushes[i];

    const tempResultMeshContainer = new Mesh();

    csgEvaluator.evaluate(
      currentResultBrush,
      nextBrush,
      ADDITION,
      tempResultMeshContainer,
    );

    if (currentResultBrush.geometry) {
      geometriesToDispose.push(currentResultBrush.geometry);
    }

    currentResultBrush = new Brush(tempResultMeshContainer.geometry);

    tempResultMeshContainer.geometry = null;
  }

  geometry = currentResultBrush.geometry;

  currentResultBrush.geometry = null;

  if (geometry && !geometry.disposed) {
    geometry.dispose();
  }

  brushes.forEach((brush) => {
    if (brush.geometry) {
      geometriesToDispose.push(brush.geometry);

      brush.geometry = null;
    }
  });

  geometriesToDispose.forEach((geometry) => {
    if (geometry && !geometry.disposed) {
      geometry.dispose();
    }
  });

  const { array: normalArray, itemSize: normalItemSize } =
    geometry.attributes.normal;

  const { array: positionArray, itemSize: positionItemSize } =
    geometry.attributes.position;

  const transferables = [normalArray.buffer, positionArray.buffer];

  return {
    transferables,
    wallsGeometryData: {
      normal: { array: normalArray, itemSize: normalItemSize },
      position: { array: positionArray, itemSize: positionItemSize },
    },
  };
};
