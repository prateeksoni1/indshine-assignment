import React from "react";
import FileDrop from "react-file-drop";

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
    <FileDrop onDrop={onFileDrop}>
      <div
        style={{
          padding: 20,
          margin: "40px 40px 0px 40px",
          border: "1px solid red",
          textAlign: "center"
        }}
      >
        Drop geojson file here
      </div>
    </FileDrop>
  );
};

export default Dragger;
