export type MultiplyVector = (
  input: { scalar: number; vector: { x: number; y: number; z: number } },
) => { x: number; y: number; z: number };
