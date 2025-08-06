import { BoxGeometry, Group, Mesh, MeshPhongMaterial, PointLight } from "three";

import { makePointer } from "../../0x04/prey/make-pointer.js";

export const makePrey = (preyInitialState) => {
  const preyBodyGeometry = new BoxGeometry(
    preyInitialState.body.width,
    preyInitialState.body.height,
    preyInitialState.body.depth,
  );

  const preyBodyMaterial = new MeshPhongMaterial({
    color: preyInitialState.body.color,
    flatShading: true,
  });

  const preyBody = new Mesh(
    preyBodyGeometry,
    preyBodyMaterial,
  );

  preyBody.position.set(0, preyInitialState.body.height / 2, 0);

  const rendering = new Group();

  rendering.add(preyBody);

  if (preyInitialState.pointer) {
    const pointer = makePointer({
      color: preyInitialState.body.color,
      depth: preyInitialState.body.depth,
      height: preyInitialState.body.height,
      width: preyInitialState.body.width,
    });

    rendering.add(pointer);
  }

  const candle = new PointLight(0xffffff, 40, 200);

  candle.position.set(0, preyInitialState.body.height + 1, 0);

  candle.castShadow = true;

  rendering.add(candle);

  rendering.position.set(
    preyInitialState.position.x,
    preyInitialState.position.y,
    preyInitialState.position.z,
  );

  rendering.rotation.y = preyInitialState.rotation.current.y;

  return {
    rendering,
    ...preyInitialState,
  };
};
