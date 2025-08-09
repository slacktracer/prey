import { BoxGeometry, Group, Mesh, MeshPhongMaterial } from "three";

export const makeBrute = (
  // {
  //   body,
  //   forward,
  //   makeFin,
  //   pointer,
  //   position,
  //   rotateTime,
  //   rotationTimeAccumulator,
  //   rotating,
  //   rotation,
  //   speed,
  //   velocity,
  // },
) => {
  const bruteBodyGeometry = new BoxGeometry(
    1, //body.width,
    3, //body.height,
    1, //body.depth,
  );

  const bruteBodyMaterial = new MeshPhongMaterial({
    color: 0x440000, //body.color,
    flatShading: true,
    transparent: true,
    opacity: 0.95,
  });

  const bruteBody = new Mesh(
    bruteBodyGeometry,
    bruteBodyMaterial,
  );

  bruteBody.position.set(0, 1 / 2, 0);

  const rendering = new Group();

  rendering.add(bruteBody);

  // const candle = new PointLight(0xffffff, 40, 200);
  //
  // candle.position.set(0, body.height + 2, 0);
  //
  // candle.castShadow = true;
  //
  // rendering.add(candle);

  rendering.position.set(
    3, //position.x,
    0, //position.y,
    3, //position.z,
  );

  rendering.rotation.y = 0; //rotation.current.y;

  return {
    // body,
    // forward,
    // pointer,
    // position,
    rendering,
    // rotateTime,
    // rotationTimeAccumulator,
    // rotating,
    // rotation,
    // speed,
    // velocity,
  };
};
