import React, { useState, useEffect } from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import {
  EditableGeoJsonLayer,
  DrawPolygonMode,
  ViewMode,
  ModifyMode
} from "nebula.gl";
import { MAPBOX_ACCESS_TOKEN } from "../../config";

const Map = props => {
  const {
    geojson,
    viewPort,
    setViewPort,
    setgeojson,
    mode,
    properties
  } = props;
  const [selectedFeatureIndexes, setSelectedFeatureIndexes] = useState([]);

  useEffect(() => {
    const newData = geojson;
    selectedFeatureIndexes.forEach(index => {
      newData.features[index].properties = {
        ...newData.features[index].properties,
        ...properties
      };
    });
    setgeojson(newData);
  }, [properties, selectedFeatureIndexes, geojson, setgeojson]);

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
    getLineColor: d =>
      d.properties.color ? d.properties.color : [0, 0, 0, 255],
    getFillColor: d =>
      d.properties.fillColor ? d.properties.fillColor : [0, 0, 0, 100],
    getLineWidth: d => (d.properties.width ? d.properties.width : 1),
    selectedFeatureIndexes,
    initialViewState: { latitude: 20.593683, longitude: 78.962883 },

    onEdit: ({ updatedData }) => {
      setgeojson(updatedData);
    },
    onClick:
      mode === "select"
        ? info => {
            console.log(info);
            if (selectedFeatureIndexes.indexOf(info.index) !== -1) {
              let newArray = selectedFeatureIndexes;
              newArray = newArray.filter(item => item !== info.index);
              setSelectedFeatureIndexes(newArray);
            } else {
              setSelectedFeatureIndexes([
                ...selectedFeatureIndexes,
                info.index
              ]);
            }
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
