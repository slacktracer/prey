import { BoxGeometry, Group, Mesh, MeshPhongMaterial } from "three";

import type { MovingThingRenderingSettings } from "./MovingThingRenderingSettings.js";

export const makeMovingThingRendering = (
  { renderingSettings }: { renderingSettings: MovingThingRenderingSettings },
) => {
  const movingThingBodyGeometry = new BoxGeometry(
    renderingSettings.width,
    renderingSettings.height,
    renderingSettings.depth,
  );

  const movingThingBodyMaterial = new MeshPhongMaterial({
    color: renderingSettings.color,
    flatShading: true,
  });

  const movingThingBody = new Mesh(
    movingThingBodyGeometry,
    movingThingBodyMaterial,
  );

  movingThingBody.position.set(0, renderingSettings.height / 2, 0);

  const rendering = new Group();

  rendering.add(movingThingBody);

  return rendering;
};
