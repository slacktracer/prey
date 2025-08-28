import { getInterpolatedPosition } from "../common/get-interpolated-position.js";
import type { UpdateOrthographicCameraGroupPosition } from "./types/UpdateOrthographicCameraGroupPosition.js";

export const updateOrthographicCameraGroupPosition:
  UpdateOrthographicCameraGroupPosition = (
    { following, interpolationFactor, orthographicCameraGroup },
  ) => {
    const orthographicCameraGroupPosition = getInterpolatedPosition({
      interpolationFactor,

      position: {
        current: {
          x: following.rendering.position.x,

          z: following.rendering.position.z,
        },

        previous: {
          x: orthographicCameraGroup.position.x,

          z: orthographicCameraGroup.position.z,
        },
      },
    });

    orthographicCameraGroup.position.x = orthographicCameraGroupPosition.x;

    orthographicCameraGroup.position.z = orthographicCameraGroupPosition.z;
  };
