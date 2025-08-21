import { BoxGeometry, Group, Mesh, MeshPhongMaterial, PointLight } from "three";

import type { MakePreyRendering } from "../types/MakePreyRendering.js";
import { makeFin } from "./make-fin.js";

export const makePreyRendering: MakePreyRendering = ({ body }) => {
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

  const fin = makeFin({
    depth: body.depth,
    height: body.height,
  });

  rendering.add(fin);

  const candle = new PointLight(0xffffff, 40, 8);

  candle.position.set(0, body.height + 2, 0);

  candle.castShadow = true;

  rendering.add(candle);

  return rendering;
};
