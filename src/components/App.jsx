import React, { useState } from "react";
import Map from "./elements/Map";
import Dragger from "./elements/Dragger";
import ReactJSONView from "react-json-view";
import { Grid, GridRow, GridColumn, Icon, Accordion } from "semantic-ui-react";

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

  const [active, setActive] = useState(false);

  return (
    <>
      <Grid>
        <GridRow style={{ padding: "10px" }}>
          <GridColumn width="4" style={{ paddingTop: "15px" }}>
            <div>
              <Dragger setgeojson={setgeojson} />
            </div>
            {geojson && (
              <Accordion fluid>
                <Accordion.Title
                  active={active}
                  onClick={() => setActive(!active)}
                >
                  <Icon name="dropdown" />
                  View GeoJSON
                </Accordion.Title>
                <Accordion.Content active={active}>
                  <ReactJSONView
                    src={geojson}
                    onEdit={e => setgeojson(e.updated_src)}
                  />
                </Accordion.Content>
              </Accordion>
            )}
          </GridColumn>
          <GridColumn width="12" style={{ paddingTop: "15px" }}>
            <Map
              viewPort={viewPort}
              setViewPort={setViewPort}
              geojson={geojson}
              setgeojson={setgeojson}
            />
          </GridColumn>
        </GridRow>
      </Grid>
    </>
  );
};

export default App;
