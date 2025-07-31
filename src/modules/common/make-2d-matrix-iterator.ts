export function* make2DMatrixIterator(matrix = []) {
  for (let i = 0; i < matrix.length; i += 1) {
    for (let j = 0; j < matrix[i].length; j += 1) {
      yield { element: matrix[i][j], i, j };
    }
  }
}
