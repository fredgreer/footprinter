import React from 'react';

const PadDetails = ({
  selectedPadPinNum,
  changeSelectedPadPinNum,
  selectedPadDimensions,
  changePinDimension
}) => {
  return (
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
        <input
          type="number"
          value={selectedPadDimensions.width}
          onChange={evt => changePinDimension(evt, 'width')}
          step={0.01}
        />
        <span className="units">mm</span>
      </div>

      <div className="input-group">
        <label>Height</label>
        <input
          type="number"
          value={selectedPadDimensions.height}
          onChange={evt => changePinDimension(evt, 'height')}
        />
        <span className="units">mm</span>
      </div>

      <div className="input-group">
        <label>Angle</label>
        <input
          type="number"
          value={selectedPadDimensions.angle}
          onChange={evt => changePinDimension(evt, 'angle')}
        />
        <span className="units">deg</span>
      </div>
    </div>
  );
};

export default PadDetails;
