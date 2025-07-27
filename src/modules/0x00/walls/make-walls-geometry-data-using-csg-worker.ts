import { makeWallsGeometryDataUsingCSG } from "./make-walls-geometry-data-using-csg.js";

self.onmessage = ({ data: { map } }) => {
  const wallsGeometryData = makeWallsGeometryDataUsingCSG({ map });

  self.postMessage(wallsGeometryData);
};
