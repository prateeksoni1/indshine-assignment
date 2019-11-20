import * as ACTION_TYPE from "./actionTypes";

export const setGeoJSON = geojson => {
  return {
    type: ACTION_TYPE.SET_GEOJSON,
    payload: geojson
  };
};
