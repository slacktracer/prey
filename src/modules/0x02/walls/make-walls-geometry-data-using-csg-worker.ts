import { makeWallsGeometryDataUsingCSG } from "./make-walls-geometry-data-using-csg.js";

self.onmessage = ({ data: { map, offsetX, offsetZ, wallHeight } }) => {
  const wallsGeometryData = makeWallsGeometryDataUsingCSG({
    map,
    offsetX,
    offsetZ,
    wallHeight,
  });

  self.postMessage(wallsGeometryData);
};
