import React from "react";
import { StaticMap } from "react-map-gl";
import DeckGL from "@deck.gl/react";
import { EditableGeoJsonLayer } from "nebula.gl";
import { MAPBOX_ACCESS_TOKEN } from "../../config";

const Map = ({ geojson, viewPort, setViewPort, setgeojson }) => {
  let selectedFeatureIndexes = [];

  const layer = new EditableGeoJsonLayer({
    id: "geojson-layer",
    data: geojson,
    selectedFeatureIndexes,
    initialViewState: { latitude: 20.593683, longitude: 78.962883 },
    onEdit: ({ updatedData }) => {
      setgeojson(updatedData);
    }
  });

  return (
    <DeckGL
      viewState={viewPort}
      height={"100vh"}
      controller={true}
      layers={[layer]}
      onViewStateChange={v => setViewPort(v.viewState)}
    >
      <StaticMap {...viewPort} mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
    </DeckGL>
  );
};

export default Map;
