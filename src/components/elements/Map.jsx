import React, { useState } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import {
  EditableGeoJsonLayer,
  DrawPolygonMode,
  ViewMode,
  ModifyMode
} from "nebula.gl";
import { MAPBOX_ACCESS_TOKEN } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { setGeoJSON, setSelectedFeatures } from "../../actions";

const Map = props => {
  const { viewPort, setViewPort, mode } = props;
  const geojson = useSelector(state => state.geojsonState.geojson);
  const selectedFeatures = useSelector(
    state => state.geojsonState.selectedFeatures
  );
  const dispatch = useDispatch();

  const getMode = () => {
    switch (mode) {
      case "draw":
        return DrawPolygonMode;
      case "select":
        return ViewMode;
      case "edit":
        return ModifyMode;
      default:
        return ViewMode;
    }
  };

  const layer = new EditableGeoJsonLayer({
    id: "geojson-layer",
    data: geojson,
    mode: getMode(),
    modeConfig: {
      enableSnapping: true
    },
    autoHighlight: true,
    pickable: true,
    selectedFeatureIndexes: selectedFeatures,
    initialViewState: { latitude: 20.593683, longitude: 78.962883 },

    onEdit: ({ updatedData }) => {
      dispatch(setGeoJSON(updatedData));
    },
    onClick:
      mode === "select"
        ? info => {
            dispatch(setSelectedFeatures([...selectedFeatures, info.index]));
          }
        : null
  });

  return (
    <DeckGL
      viewState={viewPort}
      height={"100vh"}
      controller
      layers={[layer]}
      onViewStateChange={v => setViewPort(v.viewState)}
    >
      <StaticMap {...viewPort} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};

export default Map;
