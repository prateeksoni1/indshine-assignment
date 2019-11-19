import React from "react";
import { Card, Form, Input } from "semantic-ui-react";
import { convertHex } from "../../utils";

const PropertyPanel = ({ properties, setProperties }) => {
  const handleChange = (_, { name, value }) => {
    let opacity = 255;
    if (name === "color" || name === "fillColor") {
      if (name === "fillColor") opacity = 100;
      value = convertHex(value, opacity);
    }
    if (name === "width") value = parseInt(value);
    setProperties({ ...properties, [name]: value });
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
