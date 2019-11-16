import React from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import { MAPBOX_ACCESS_TOKEN } from "../../config";

const Map = ({ geojson, viewPort, setViewPort }) => {
  return (
    <ReactMapGL
      {...viewPort}
      onViewportChange={setViewPort}
      mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN}
    >
      <Source id="my-data" type="geojson" data={geojson}>
        <Layer
          id="point"
          type="circle"
          paint={{
            "circle-radius": 10,
            "circle-color": "#007cbf"
          }}
        />
      </Source>
    </ReactMapGL>
  );
};

export default Map;
