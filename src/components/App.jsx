import React, { useState } from "react";
import Map from "./elements/Map";

const App = () => {
  const [viewPort, setViewPort] = useState({
    zoom: 6.8,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    width: "100%",
    height: "100vh",
    latitude: 20.593683,
    longitude: 78.962883
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
    <div className="ui grid">
      <div className="two column row">
        <div className="four wide column">controls</div>
        <div className="twelve wide column">
          <Map
            viewPort={viewPort}
            setViewPort={setViewPort}
            geojson={geojson}
          />
        </div>
      </div>
    </div>
  );
};

export default App;
