import React from "react";
import { Card, Form, Input } from "semantic-ui-react";
import { convertHex } from "../../utils";
import { useDispatch, useSelector } from "react-redux";
import { setGeoJSON } from "../../actions";

const PropertyPanel = () => {
  const dispatch = useDispatch();
  const geojson = useSelector(state => state.geojsonState.geojson);
  const selectedFeatures = useSelector(
    state => state.geojsonState.selectedFeatures
  );

  const handleChange = (_, { name, value }) => {
    let opacity = 255;
    if (name === "color" || name === "fillColor") {
      if (name === "fillColor") opacity = 100;
      value = convertHex(value, opacity);
    }
    if (name === "width") value = parseInt(value);
    const newFeatures = geojson.features.map((feature, index) => {
      const newFeature = feature;
      if (selectedFeatures.indexOf(index) !== -1) {
        newFeature.properties = { ...newFeature.properties, [name]: value };
      }
      return newFeature;
    });
    dispatch(setGeoJSON({ ...geojson, features: newFeatures }));
    console.log(geojson);
  };

  return (
    <Card fluid>
      <Card.Content>
        <Card.Header>Properties</Card.Header>
        <Form style={{ marginTop: 10 }}>
          <Form.Group widths="equal">
            <Form.Field inline>
              <label>Line color</label>
              <Input name="color" type="color" onChange={handleChange} fluid />
            </Form.Field>
            <Form.Field inline>
              <label>Fill color</label>
              <Input
                name="fillColor"
                type="color"
                onChange={handleChange}
                fluid
              />
            </Form.Field>
          </Form.Group>
          <Form.Group widths="equal">
            <Form.Field inline width={8}>
              <label>Line Width</label>
              <Input name="width" type="number" onChange={handleChange} fluid />
            </Form.Field>
          </Form.Group>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default PropertyPanel;
