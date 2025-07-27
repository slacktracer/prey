import { PointLight } from "three";

export const makePointLight = () => {
  const pointLight = new PointLight(0xffffff, 40, 200);

  pointLight.position.set(0, 0, 3.5);

  pointLight.castShadow = true;

  return pointLight;
};
