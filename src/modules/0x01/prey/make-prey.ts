import { BoxGeometry, Group, Mesh, MeshPhongMaterial, PointLight } from "three";

import { makeMagicHat } from "./make-magic-hat";

export const makePrey = ({ body: { depth, height, width }, hat }) => {
  const preyBodyGeometry = new BoxGeometry(width, height, depth);

  const preyBodyMaterial = new MeshPhongMaterial({
    color: "whitesmoke",
    flatShading: true,
  });

  const preyBody = new Mesh(
    preyBodyGeometry,
    preyBodyMaterial,
  );

  preyBody.position.set(0, height / 2, 0);

  const rendering = new Group();

  rendering.add(preyBody);

  const candle = new PointLight(0xffffff, 40, 200);

  candle.position.set(0, height + 1, 0);

  candle.castShadow = true;

  rendering.add(candle);

  if (hat) {
    const magicHat = makeMagicHat({ height });

    rendering.add(magicHat);
  }

  const prey = {
    rendering,
  };

  return prey;
};
