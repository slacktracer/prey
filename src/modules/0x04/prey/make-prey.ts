import { BoxGeometry, Group, Mesh, MeshPhongMaterial, PointLight } from "three";

import type { MakePrey } from "../types/MakePrey.js";

export const makePrey: MakePrey = (
  { body, makePointer, pointer, position, rotateTime, rotating, rotation },
) => {
  const preyBodyGeometry = new BoxGeometry(
    body.width,
    body.height,
    body.depth,
  );

  const preyBodyMaterial = new MeshPhongMaterial({
    color: body.color,
    flatShading: true,
  });

  const preyBody = new Mesh(
    preyBodyGeometry,
    preyBodyMaterial,
  );

  preyBody.position.set(0, body.height / 2, 0);

  const rendering = new Group();

  rendering.add(preyBody);

  if (pointer) {
    rendering.add(makePointer({
      color: body.color,
      depth: body.depth,
      height: body.height,
      width: body.width,
    }));
  }

  const candle = new PointLight(0xffffff, 40, 200);

  candle.position.set(0, body.height + 1, 0);

  candle.castShadow = true;

  rendering.add(candle);

  rendering.position.set(
    position.x,
    position.y,
    position.z,
  );

  rendering.rotation.y = rotation.current.y;

  return {
    body,
    pointer,
    position,
    rendering,
    rotateTime,
    rotating,
    rotation,
  };
};
