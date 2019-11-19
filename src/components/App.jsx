import React, { useState } from "react";
import Map from "./elements/Map";
import LeftPane from "./LeftPane";
import { Grid, GridRow, GridColumn } from "semantic-ui-react";

const App = () => {
  const [viewPort, setViewPort] = useState({
    zoom: 6.8,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    latitude: 20.593683,
    longitude: 78.962883
  });

  const [geojson, setgeojson] = useState({
    type: "FeatureCollection",
    features: []
  });

  const [mode, setMode] = useState("draw");

  return (
    <>
      <Grid>
        <GridRow style={{ padding: "10px" }}>
          <GridColumn width="4" style={{ paddingTop: "15px" }}>
            <LeftPane
              geojson={geojson}
              setgeojson={setgeojson}
              setMode={setMode}
            />
          </GridColumn>
          <GridColumn width="12" style={{ paddingTop: "15px" }}>
            <Map
              viewPort={viewPort}
              setViewPort={setViewPort}
              geojson={geojson}
              setgeojson={setgeojson}
              mode={mode}
            />
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  );
};

export default App;
