import React from 'react';
import Dropzone from 'react-dropzone';

const NullState = ({ setExample, handleDrop }) => {
  return (
    <div id="null-state">
      <h1>Footprinter</h1>
      <p>Quick KiCad footprints from component datasheets.</p>

      <Dropzone onDrop={handleDrop} accept="image/*">
        {({ getRootProps, getInputProps }) => (
          <div className="dropzone" {...getRootProps()}>
            <input {...getInputProps()} />
            <p>Drop footprint image here (.jpg or .png)</p>
            <p className="or">OR</p>
            <button className="select-file primary lg">Select File</button>
          </div>
        )}
      </Dropzone>

      <p>Not sure what's going on?</p>

      <p>
        <button onClick={setExample} className="md secondary example">
          Start with an example
        </button>
      </p>

      <p>
        <a href="https://github.com/fredgreer/footprinter#usage">
          Read the docs
        </a>
      </p>
    </div>
  );
};

export default NullState;
