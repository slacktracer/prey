export const doPlacesOverlap: (
  input: {
    placeA: { x: number[]; z: number[] };
    placeB: { x: number[]; z: number[] };
  },
) => boolean = ({ placeA, placeB }) =>
  placeA.x.some((x) => placeB.x.includes(x)) &&
  placeA.z.some((z) => placeB.z.includes(z));
