import React, { useState } from "react";
import Map from "./elements/Map";
import LeftPane from "./LeftPane";
import { Grid, GridColumn } from "semantic-ui-react";

const App = () => {
  const [viewPort, setViewPort] = useState({
    zoom: 6.8,
    bearing: 0,
    pitch: 0,
    dragPan: true,
    latitude: 20.593683,
    longitude: 78.962883
  });

  const [mode, setMode] = useState("draw");
  const [drawMode, setDrawMode] = useState("polygon");

  return (
    <>
      <Grid doubling stackable columns={2} style={{ padding: "10px" }}>
        <GridColumn width="4" style={{ paddingTop: "15px" }}>
          <LeftPane
            mode={mode}
            setMode={setMode}
            drawMode={drawMode}
            setDrawMode={setDrawMode}
          />
        </GridColumn>
        <GridColumn width="12" style={{ paddingTop: "15px" }}>
          <Map
            viewPort={viewPort}
            setViewPort={setViewPort}
            mode={mode}
            drawMode={drawMode}
          />
        </GridColumn>
      </Grid>
    </>
  );
};

export default App;
