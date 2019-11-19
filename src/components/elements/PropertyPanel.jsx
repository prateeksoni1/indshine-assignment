import React from "react";
import { Card, Form, Input } from "semantic-ui-react";
import { convertHex } from "../../utils";

const PropertyPanel = ({ properties, setProperties }) => {
  const handleChange = (_, { name, value }) => {
    if (name === "color") {
      value = convertHex(value);
    }
    setProperties({ ...properties, [name]: value });
  };

  return (
    <Card fluid>
      <Card.Content>
        <Form>
          <Form.Field inline>
            <label>Line color</label>
            <Input name="color" type="color" onChange={handleChange} />
          </Form.Field>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default PropertyPanel;
