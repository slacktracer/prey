export function* makeMatrix2Iterator(matrix2) {
  for (let i = 0; i < matrix2.length; i += 1) {
    for (let j = 0; j < matrix2[i].length; j += 1) {
      yield { i, j, value: matrix2[i][j] };
    }
  }
}
