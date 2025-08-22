import { BoxGeometry, Group, Mesh, MeshPhongMaterial } from "three";

import type { MovingThingRenderingSettings } from "./MovingThingRenderingSettings.js";

export const makeMovingThingRendering = (
  { renderingSettings }: { renderingSettings: MovingThingRenderingSettings },
) => {
  const renderingOffset = {
    x: 0 + renderingSettings.depth / 2,
    z: 0 + renderingSettings.width / 2,
  };

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

  movingThingBody.position.set(
    0 + renderingOffset.x,
    renderingSettings.height / 2,
    0 + renderingOffset.z,
  );

  const rendering = new Group();

  rendering.add(movingThingBody);

  return rendering;
};
