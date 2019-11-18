import React from "react";
import FileDrop from "react-file-drop";
import { Button, Icon } from "semantic-ui-react";

const Dragger = ({ setgeojson }) => {
  let fileReader = new FileReader();

  const onFileDrop = (files, event) => {
    console.log({ files, event });
    fileReader.onloadend = _ => {
      let json = fileReader.result;
      json = JSON.parse(json);
      setgeojson(json);
    };
    fileReader.readAsText(files[0]);
  };

  return (
    <>
      <FileDrop onDrop={onFileDrop}>
        <Button
          icon
          color="google plus"
          size="medium"
          fluid
          labelPosition="left"
        >
          <Icon name="code" />
          Drop GeoJSON here
        </Button>
      </FileDrop>
    </>
  );
};

export default Dragger;
