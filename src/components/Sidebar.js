import React from 'react';
import RulerIcon from 'mdi-react/RulerIcon';
import DownloadIcon from 'mdi-react/DownloadIcon';
import CardOutlineIcon from 'mdi-react/CardOutlineIcon';
import TargetIcon from 'mdi-react/TargetIcon';
import RestartIcon from 'mdi-react/RestartIcon';

import PadDetails from './PadDetails';

const Sidebar = ({
  setScale,
  addPad,
  exportFile,
  selectedPadPinNum,
  selectedPadDimensions,
  changeSelectedPadPinNum,
  footprintName,
  setFootprintName,
  changePinDimension,
  resetWorkspace
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
      </ul>

      <ul className="actions">
        <li onClick={addPad}>
          <CardOutlineIcon />
          Place pad
        </li>
        <li onClick={addPad}>
          <TargetIcon />
          Place origin
        </li>
      </ul>

      <ul className="actions">
        <li onClick={exportFile}>
          <DownloadIcon /> Export KiCad Footprint
        </li>
        <li onClick={resetWorkspace}>
          <RestartIcon /> Reset Workspace
        </li>
      </ul>

      <div className="links">
        <a href="#">Help</a> |{' '}
        <a
          href="https://github.com/fredgreer/footprinter"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>

      {selectedPadPinNum && (
        <PadDetails
          selectedPadPinNum={selectedPadPinNum}
          changeSelectedPadPinNum={changeSelectedPadPinNum}
          selectedPadDimensions={selectedPadDimensions}
          changePinDimension={changePinDimension}
        />
      )}
    </div>
  );
};

export default Sidebar;
