import React from "react";
import { Icon, Accordion, Button, Card, Table } from "semantic-ui-react";
import { length, area, getGeom } from "@turf/turf";

const DisplayProps = ({ feature }) => {
  const geometry = getGeom(feature);

  return (
    <Card raised fluid>
      <Card.Content>
        <Card.Header>Deductions</Card.Header>
        <Table celled basic="very">
          <Table.Body>
            <Table.Row>
              <Table.Cell>Length</Table.Cell>
              <Table.Cell>{length(feature)} km</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Area</Table.Cell>
              <Table.Cell>{area(feature)} sq.m</Table.Cell>
            </Table.Row>
            <Table.Row>
              <Table.Cell>Geometry</Table.Cell>
              <Table.Cell>{geometry.type}</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </Card.Content>
    </Card>
  );
};

export default DisplayProps;
