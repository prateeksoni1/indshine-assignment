import { combineReducers } from "redux";
import * as ACTION_TYPE from "../actions/actionTypes";

const INITIAL_STATE = {
  geojson: {
    type: "FeatureCollection",
    features: []
  },
  selectedFeatures: []
};

const geojsonReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ACTION_TYPE.SET_GEOJSON:
      return {
        ...state,
        geojson: action.payload
      };
    case ACTION_TYPE.SET_SELECTED_FEATURES:
      return {
        ...state,
        selectedFeatures: action.payload
      };
    default:
      return state;
  }
};

export default combineReducers({
  geojsonState: geojsonReducer
});
