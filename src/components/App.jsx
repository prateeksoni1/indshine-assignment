import React, { useState, useEffect } from "react";
import ReactMapGL, { Source, Layer } from "react-map-gl";
import { MAPBOX_ACCESS_TOKEN } from "../config";

const App = () => {
  const [state, setState] = useState({
    geojson: {
      type: "FeatureCollection",
      features: []
    }
  });

  const [viewPort, setViewPort] = useState({
    zoom: 6.8,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    width: 600,
    height: 600,
    latitude: 38.8951,
    longitude: -77.0364
  });

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: { type: "Point", coordinates: [102.0, 0.5] },
        properties: { prop0: "value0" }
      },
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [
            [102.0, 0.0],
            [103.0, 1.0],
            [104.0, 0.0],
            [105.0, 1.0]
          ]
        },
        properties: {
          prop0: "value0",
          prop1: 0.0
        }
      },
      {
        type: "Feature",
        geometry: {
          type: "Polygon",
          coordinates: [
            [
              [100.0, 0.0],
              [101.0, 0.0],
              [101.0, 1.0],
              [100.0, 1.0],
              [100.0, 0.0]
            ]
          ]
        },
        properties: {
          prop0: "value0",
          prop1: { this: "that" }
        }
      }
    ]
  };
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

export default App;
