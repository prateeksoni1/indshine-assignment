import React from "react";
import FileDrop from "react-file-drop";
import { Button, Icon, Label } from "semantic-ui-react";
import { useDispatch } from "react-redux";
import { setGeoJSON } from "../../actions";

const Dragger = () => {
  const dispatch = useDispatch();
  let fileReader = new FileReader();
  const onFileDrop = (files, event) => {
    fileReader.onloadend = _ => {
      let json = fileReader.result;
      json = JSON.parse(json);
      dispatch(setGeoJSON(json));
    };
    fileReader.readAsText(files[0]);
  };

  return (
    <>
      <FileDrop onDrop={onFileDrop}>
        <Button icon color="green" size="medium" fluid labelPosition="left">
          <Icon name="code" />
          Drop GeoJSON here
        </Button>
      </FileDrop>
    </>
  );
};

export default Dragger;
