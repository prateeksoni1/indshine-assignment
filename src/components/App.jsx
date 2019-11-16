import React, { useState } from "react";
import Map from "./elements/Map";
import Dragger from "./elements/Dragger";
import ReactJSONView from "react-json-view";

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

  const [geojson, setgeojson] = useState(null);

  const [isVisible, setIsVisible] = useState(false);

  return (
    <div className="ui grid">
      <div className="two column row">
        <div className="four wide column">
          <Dragger setgeojson={setgeojson} />
          {geojson && (
            <div className="ui styled fluid accordion">
              <div
                className={isVisible ? "title active" : "title"}
                onClick={() => setIsVisible(!isVisible)}
              >
                <i className="dropdown icon"></i>
                View GeoJSON
              </div>
              <div className={isVisible ? "content active" : "content"}>
                <ReactJSONView
                  src={geojson}
                  onEdit={e => setgeojson(e.updated_src)}
                />
              </div>
            </div>
          )}
        </div>
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
