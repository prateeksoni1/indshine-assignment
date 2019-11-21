import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import {
  EditableGeoJsonLayer,
  DrawPolygonMode,
  DrawLineStringMode,
  DrawPointMode,
  ViewMode,
  ModifyMode
} from "nebula.gl";
import { MAPBOX_ACCESS_TOKEN } from "../../config";
import { useSelector, useDispatch } from "react-redux";
import { setGeoJSON, setSelectedFeatures } from "../../actions";

const Map = props => {
  const { viewPort, setViewPort, mode, drawMode } = props;
  const geojson = useSelector(state => state.geojsonState.geojson);
  const selectedFeatures = useSelector(
    state => state.geojsonState.selectedFeatures
  );
  const dispatch = useDispatch();

  const getMode = () => {
    switch (mode) {
      case "draw":
        switch (drawMode) {
          case "line":
            return DrawLineStringMode;
          case "point":
            return DrawPointMode;
          default:
            return DrawPolygonMode;
        }
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
    getLineColor: d =>
      d.properties.color ? d.properties.color : [0, 0, 0, 255],
    getFillColor: d =>
      d.properties.fillColor ? d.properties.fillColor : [0, 0, 0, 100],
    getLineWidth: d => (d.properties.width ? d.properties.width : 8),
    selectedFeatureIndexes: selectedFeatures,
    initialViewState: { latitude: 20.593683, longitude: 78.962883 },

    onEdit: ({ updatedData }) => {
      dispatch(setGeoJSON(updatedData));
    },
    onClick:
      mode === "select"
        ? info => {
            if (selectedFeatures.indexOf(info.index) !== -1) {
              let newArray = selectedFeatures.filter(
                item => item !== info.index
              );
              dispatch(setSelectedFeatures(newArray));
            } else {
              dispatch(setSelectedFeatures([info.index]));
            }
          }
        : null
  });

  return (
    <DeckGL
      viewState={viewPort}
      height={"100vh"}
      controller={{ doubleClickZoom: false }}
      layers={[layer]}
      onViewStateChange={v => setViewPort(v.viewState)}
    >
      <StaticMap {...viewPort} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};

export default Map;
