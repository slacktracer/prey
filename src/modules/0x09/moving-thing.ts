import { BoxGeometry, Group, Mesh, MeshPhongMaterial, PointLight } from "three";

const body = {
  color: 0xf887c7,
  depth: 0.5,
  height: 1,
  width: 0.5,
};

export const makeMovingThing = () => {
  const movingThingBodyGeometry = new BoxGeometry(
    body.width,
    body.height,
    body.depth,
  );

  const movingThingBodyMaterial = new MeshPhongMaterial({
    color: body.color,
    flatShading: true,
  });

  const movingThingBody = new Mesh(
    movingThingBodyGeometry,
    movingThingBodyMaterial,
  );

  movingThingBody.position.set(0, body.height / 2, 0);

  const rendering = new Group();

  rendering.add(movingThingBody);

  const candle = new PointLight(0xf887c7, 40, 8);

  candle.position.set(0, body.height + 2, 0);

  candle.castShadow = true;

  rendering.add(candle);

  return { rendering };
};

export const updateMovingThing = () => {};
