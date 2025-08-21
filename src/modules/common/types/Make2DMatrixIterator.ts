export type Make2DMatrixIterator = <T>(
  matrix?: T[][],
) => Generator<{ element: T; i: number; j: number }, void, unknown>;
