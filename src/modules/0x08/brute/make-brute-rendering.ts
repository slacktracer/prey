import { BoxGeometry, Group, Mesh, MeshPhongMaterial } from "three";

import type { MakeBruteRendering } from "../types/MakeBruteRendering.js";

export const makeBruteRendering: MakeBruteRendering = ({ body }) => {
  const bruteBodyGeometry = new BoxGeometry(
    body.width,
    body.height,
    body.depth,
  );

  const bruteBodyMaterial = new MeshPhongMaterial({
    color: body.color,
    flatShading: true,
    opacity: 0.8,
    transparent: true,
  });

  const bruteBody = new Mesh(
    bruteBodyGeometry,
    bruteBodyMaterial,
  );

  bruteBody.position.set(0, body.height / 2, 0);

  const rendering = new Group();

  rendering.add(bruteBody);

  return rendering;
};
