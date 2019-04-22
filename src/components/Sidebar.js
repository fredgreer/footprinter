import React from 'react';
import RulerIcon from 'mdi-react/RulerIcon';
import DownloadIcon from 'mdi-react/DownloadIcon';
import CardIcon from 'mdi-react/CardIcon';

const Sidebar = ({
  setScale,
  addPad,
  exportFile,
  selectedPadPinNum,
  changeSelectedPadPinNum,
  footprintName,
  setFootprintName
}) => {
  return (
    <div id="sidebar">
      <h1>Footprinter</h1>

      <input
        type="text"
        placeholder="Enter footprint name..."
        className="footprint-name"
        value={footprintName}
        onChange={setFootprintName}
      />

      <ul className="actions">
        <li onClick={setScale}>
          <RulerIcon /> Set Scale
        </li>

        <li onClick={addPad}>
          <CardIcon />
          Place pad
        </li>

        <li onClick={exportFile}>
          <DownloadIcon /> Export KiCad Footprint
        </li>
      </ul>

      <div className="links">
        <a href="#">Help</a> | <a href="#">GitHub</a>
      </div>

      <div id="pad-details">
        <div className="input-group">
          <label>Pin number</label>
          <input
            type="text"
            value={selectedPadPinNum}
            onChange={changeSelectedPadPinNum}
          />
        </div>

        <hr />

        <div className="input-group">
          <label>X</label>
          <input type="number" />
          <span className="units">mm</span>
        </div>

        <div className="input-group">
          <label>Y</label>
          <input type="number" />
          <span className="units">mm</span>
        </div>

        <div className="input-group">
          <label>Width</label>
          <input type="number" />
          <span className="units">mm</span>
        </div>

        <div className="input-group">
          <label>Height</label>
          <input type="number" />
          <span className="units">mm</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
