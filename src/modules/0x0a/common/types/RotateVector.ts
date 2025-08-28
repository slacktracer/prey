export type RotateVector = (
  input: {
    quaternion: { x: number; y: number; z: number; w: number };
    vector: { x: number; y: number; z: number };
  },
) => { x: number; y: number; z: number };
