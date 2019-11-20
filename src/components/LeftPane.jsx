import React, { useState } from "react";
import Dragger from "./elements/Dragger";
import ReactJSONView from "react-json-view";
import { Icon, Accordion, Button } from "semantic-ui-react";
import { useSelector, useDispatch } from "react-redux";
import { setGeoJSON, setSelectedFeatures } from "../actions";
import PropertyPanel from "./elements/PropertyPanel";
import area from "@turf/area";

const LeftPane = ({ setMode }) => {
  const dispatch = useDispatch();
  const [active, setActive] = useState(false);
  const geojson = useSelector(state => state.geojsonState.geojson);
  const selectedFeatures = useSelector(
    state => state.geojsonState.selectedFeatures
  );
  const handleDelete = () => {
    const filteredFeatures = geojson.features.filter((feature, index) => {
      if (selectedFeatures.indexOf(index) !== -1) return false;
      return true;
    });
    dispatch(setSelectedFeatures([]));
    dispatch(setGeoJSON({ ...geojson, features: filteredFeatures }));
  };

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
      {selectedFeatures.length > 0 && (
        <div>
          <PropertyPanel />
          <div>Area: {area(geojson.features[selectedFeatures[0]])}</div>
          <Button
            color="red"
            fluid
            style={{ marginTop: 10 }}
            onClick={handleDelete}
            icon
            labelPosition="right"
          >
            <Icon name="delete" />
            Delete selected objects
          </Button>
        </div>
      )}
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
