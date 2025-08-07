import type { Make2DMatrixIterator } from "./types/Make2DMatrixIterator.js";

export const make2DMatrixIterator: Make2DMatrixIterator = function* <T>(
  matrix: T[][] = [],
) {
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      yield { element: matrix[i][j], i, j };
    }
  }
};
