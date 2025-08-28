export type GetInterpolatedPosition = (
  input: {
    interpolationFactor: number;
    position: {
      current: { x: number; z: number };
      previous: { x: number; z: number };
    };
  },
) => { x: number; z: number };
