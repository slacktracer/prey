export type GetForward = (input: {
  rotation: number;
}) => readonly ["x" | "z", -1 | 1];
