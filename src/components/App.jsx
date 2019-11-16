import React, { useState } from "react";
import Map from "./elements/Map";
import FileDrop from "react-file-drop";

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
  let fileReader = new FileReader();

  const onFileDrop = (files, event) => {
    console.log({ files, event });
    fileReader.onloadend = _ => {
      let json = fileReader.result;
      json = JSON.parse(json);
      setgeojson(json);
    };
    fileReader.readAsText(files[0]);
  };

  return (
    <div className="ui grid">
      <div className="two column row">
        <div className="four wide column">
          <div
            style={{
              padding: 20,
              margin: 40,
              border: "1px solid red",
              textAlign: "center",
              cursor: ""
            }}
          >
            <FileDrop onDrop={onFileDrop}>Drop geojson file here</FileDrop>
          </div>
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
