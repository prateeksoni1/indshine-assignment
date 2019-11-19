import React from "react";
import { Card, Form, Input } from "semantic-ui-react";

const PropertyPanel = ({ properties, setProperties }) => {
  const handleChange = (_, { name, value }) => {
    console.log({ name, value });
    setProperties({ ...properties, [name]: value });
  };

  return (
    <Card fluid>
      <Card.Content>
        <Form>
          <Form.Field inline>
            <label>Line color</label>
            <Input name="getLineColor" type="color" onChange={handleChange} />
          </Form.Field>
        </Form>
      </Card.Content>
    </Card>
  );
};

export default PropertyPanel;
