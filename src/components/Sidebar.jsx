import React from 'react';
import RulerIcon from 'mdi-react/RulerIcon';
import DownloadIcon from 'mdi-react/DownloadIcon';
import CardOutlineIcon from 'mdi-react/CardOutlineIcon';
import RestartIcon from 'mdi-react/RestartIcon';
import cn from 'classnames';
import PadDetails from './PadDetails';
import { UI_STATES } from '../constants';

const SidebarOption = ({ Icon, text, onClick, isDisabled, hotkey = null }) => {
  const handleClick = () => {
    if (!isDisabled) onClick();
  };

  return (
    <li onClick={handleClick} className={cn({ disabled: isDisabled })}>
      <Icon /> {text}
      {hotkey && <span className="hotkey">({hotkey})</span>}
    </li>
  );
};

const Sidebar = ({
  uiState,
  setScale,
  addPad,
  toggleOrigin,
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
        <SidebarOption
          Icon={RulerIcon}
          text="Set Scale"
          hotkey="s"
          onClick={setScale}
          isDisabled={uiState !== UI_STATES.DRAW}
        />
      </ul>

      <ul className="actions">
        <SidebarOption
          Icon={CardOutlineIcon}
          text="Place Pad"
          hotkey="p"
          onClick={addPad}
          isDisabled={uiState !== UI_STATES.DRAW}
        />
      </ul>

      <ul className="actions">
        <SidebarOption
          Icon={DownloadIcon}
          text="Export KiCad Footprint"
          hotkey="e"
          onClick={exportFile}
          isDisabled={uiState !== UI_STATES.DRAW}
        />

        <SidebarOption
          Icon={RestartIcon}
          text="Reset Workspace"
          onClick={resetWorkspace}
          isDisabled={uiState === UI_STATES.AWAITING_IMAGE}
        />
      </ul>

      <div className="links">
        <a
          href="https://github.com/fredgreer/footprinter/help"
          target="_blank"
          rel="noopener noreferrer"
        >
          Help
        </a>{' '}
        |{' '}
        <a
          href="https://github.com/fredgreer/footprinter"
          target="_blank"
          rel="noopener noreferrer"
        >
          GitHub
        </a>
      </div>

      {selectedPadPinNum !== null && (
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
