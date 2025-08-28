/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import { BoxGeometry, Mesh } from "three";
import { ADDITION, Brush, Evaluator } from "three-bvh-csg";

import type { MakeWallsGeometryDataUsingCSG } from "./types/MakeWallsGeometryDataUsingCSG.js";

export const makeWallsGeometryDataUsingCSG: MakeWallsGeometryDataUsingCSG = ({
  height,
  map,
  offsetX,
  offsetZ,
}) => {
  const wallHeightOffset = height / 2;

  const csgEvaluator = new Evaluator();

  csgEvaluator.attributes = ["position", "normal"];

  const brushes = [];

  const geometriesToDispose = [];

  for (let i = 0; i < map.length; i += 1) {
    for (let j = 0; j < map[i].length; j += 1) {
      if (map[i][j] === 1) {
        const wallBlockGeometry = new BoxGeometry(1, height, 1);

        geometriesToDispose.push(wallBlockGeometry);

        const brush = new Brush(wallBlockGeometry);

        brush.position.set(j - offsetX, wallHeightOffset, i - offsetZ);

        brush.updateMatrixWorld(true);

        brushes.push(brush);
      }
    }
  }

  let currentResultBrush = brushes[0];

  for (let i = 1; i < brushes.length; i += 1) {
    const nextBrush = brushes[i];

    if (currentResultBrush.geometry) {
      geometriesToDispose.push(currentResultBrush.geometry);
    }

    if (nextBrush.geometry) {
      geometriesToDispose.push(nextBrush.geometry);
    }

    const tempResultMeshContainer = new Mesh();

    csgEvaluator.evaluate(
      currentResultBrush,
      nextBrush,
      ADDITION,
      tempResultMeshContainer,
    );

    currentResultBrush = new Brush(tempResultMeshContainer.geometry);

    tempResultMeshContainer.geometry = null;
  }

  const geometryData = currentResultBrush.geometry;

  currentResultBrush.geometry = null;

  for (let i = 0; i < geometriesToDispose.length; i += 1) {
    const geometry = geometriesToDispose[i];

    if (geometry && !geometry.disposed) {
      geometry.dispose();
    }
  }

  if (geometryData && !geometryData.disposed) {
    geometryData.dispose();
  }

  const { array: normalArray, itemSize: normalItemSize } =
    geometryData.attributes.normal;

  const { array: positionArray, itemSize: positionItemSize } =
    geometryData.attributes.position;

  const transferables = [normalArray.buffer, positionArray.buffer];

  return {
    wallsGeometryData: {
      normal: { array: normalArray, itemSize: normalItemSize },
      position: { array: positionArray, itemSize: positionItemSize },
    },

    transferables,
  };
};
