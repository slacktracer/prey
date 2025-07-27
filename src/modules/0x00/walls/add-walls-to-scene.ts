import { makeWallsGeometry } from "./make-walls-geometry.js";
import { makeWallsGivenGeometry } from "./make-walls-given-geometry.js";
import { makeWallsUsingInstancing } from "./make-walls-using-instancing.js";

export const addWallsToScene = ({ map, scene }) => {
  const { walls: wallsUsingInstancing } = makeWallsUsingInstancing({ map });

  scene.add(wallsUsingInstancing);

  const makeWallsGeometryDataUsingCSGWorker = new Worker(
    new URL("./make-walls-geometry-data-using-csg-worker.ts", import.meta.url),
    { type: "module" },
  );

  makeWallsGeometryDataUsingCSGWorker.onmessage = (event) => {
    const { wallsGeometryData } = event.data;

    const { wallsGeometry } = makeWallsGeometry({ wallsGeometryData });

    scene.remove(wallsUsingInstancing);

    const { walls } = makeWallsGivenGeometry({ wallsGeometry });

    scene.add(walls);

    makeWallsGeometryDataUsingCSGWorker.terminate();
  };

  makeWallsGeometryDataUsingCSGWorker.postMessage({ map });
};
