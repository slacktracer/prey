export const getPlace: (
  input: { side: number; x: number; z: number },
) => { x: number[]; z: number[] } = ({ side, x, z }) => {
  const xPlace = [];

  const zPlace = [];

  for (let i = 0; i < side; i += 1) {
    xPlace.push(x + i);

    zPlace.push(z + i);
  }

  return { x: xPlace, z: zPlace };
};
