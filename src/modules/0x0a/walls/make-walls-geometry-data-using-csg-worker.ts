import { makeWallsGeometryDataUsingCSG } from "./make-walls-geometry-data-using-csg.js";

self.onmessage = ({ data: { height, map, offsetX, offsetZ } }) => {
  const wallsGeometryData = makeWallsGeometryDataUsingCSG({
    height,
    map,
    offsetX,
    offsetZ,
  });

  self.postMessage(wallsGeometryData);
};
