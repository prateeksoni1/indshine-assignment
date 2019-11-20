import React, { useState } from "react";
import Dragger from "./elements/Dragger";
import ReactJSONView from "react-json-view";
import { Icon, Accordion, Button } from "semantic-ui-react";
<<<<<<< HEAD
import PropertyPanel from "./elements/PropertyPanel";

const LeftPane = ({
  geojson,
  setgeojson,
  setMode,
  properties,
  setProperties
}) => {
=======
import { useSelector, useDispatch } from "react-redux";
import { setGeoJSON } from "../actions";
import PropertyPanel from "./elements/PropertyPanel";

const LeftPane = ({ setMode }) => {
  const dispatch = useDispatch();
>>>>>>> origin/dev
  const [active, setActive] = useState(false);
  const geojson = useSelector(state => state.geojsonState.geojson);

  return (
    <div>
      <div>
        <Dragger />
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
<<<<<<< HEAD
      <PropertyPanel properties={properties} setProperties={setProperties} />
=======
      <PropertyPanel />
>>>>>>> origin/dev
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
              onEdit={e => dispatch(setGeoJSON(e.updated_src))}
            />
          </Accordion.Content>
        </Accordion>
      )}
    </div>
  );
};

export default LeftPane;
