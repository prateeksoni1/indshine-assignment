import React, { useState } from "react";
import Dragger from "./elements/Dragger";
import ReactJSONView from "react-json-view";
import { Icon, Accordion, Button } from "semantic-ui-react";
import PropertyPanel from "./elements/PropertyPanel";

const LeftPane = ({
  geojson,
  setgeojson,
  setMode,
  properties,
  setProperties
}) => {
  const [active, setActive] = useState(false);

  return (
    <div>
      <div>
        <Dragger setgeojson={setgeojson} />
      </div>
      <div style={{ marginTop: 10 }}>
        <Button.Group fluid>
          <Button onClick={() => setMode("draw")}>Draw</Button>
          <Button.Or />
          <Button onClick={() => setMode("select")}>Select</Button>
          <Button.Or />
          <Button onClick={() => setMode("edit")}>Edit</Button>
        </Button.Group>
      </div>
      <PropertyPanel properties={properties} setProperties={setProperties} />
      {geojson && (
        <Accordion fluid>
          <Accordion.Title active={active} onClick={() => setActive(!active)}>
            <Icon name="dropdown" />
            View GeoJSON
          </Accordion.Title>
          <Accordion.Content active={active}>
            <ReactJSONView
              displayObjectSize
              indentWidth="2"
              src={geojson}
              onEdit={e => setgeojson(e.updated_src)}
            />
          </Accordion.Content>
        </Accordion>
      )}
    </div>
  );
};

export default LeftPane;
