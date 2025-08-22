import { doPlacesOverlap } from "./do-places-overlap.js";
import { getPlace } from "./get-place.js";

export const detectOverlap: (
  input: {
    thing: {
      id: string;
      position: { target: { x: number; y: number; z: number } };
      renderingSettings: { side: number };
    };
    thingList: {
      id: string;
      place: { x: number[]; z: number[] };
      position: { target: { x: number; y: number; z: number } };
      renderingSettings: { side: number };
    }[];
  },
) => boolean = ({ thing, thingList }) => {
  const side = thing.renderingSettings.side;

  const { x, z } = thing.position.target;

  const thingTargetPlace = getPlace({ side, x, z });

  return thingList.some((thingListItem) => {
    if (thing.id === thingListItem.id) {
      return false;
    }

    const thingListItemTargetPlace = getPlace({
      side: thingListItem.renderingSettings.side,
      x: thingListItem.position.target.x,
      z: thingListItem.position.target.z,
    });

    return doPlacesOverlap({
      placeA: thingTargetPlace,
      placeB: thingListItem.place,
    }) || doPlacesOverlap({
      placeA: thingTargetPlace,
      placeB: thingListItemTargetPlace,
    });
  });
};
