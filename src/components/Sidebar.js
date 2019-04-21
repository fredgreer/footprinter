import React from 'react';

const Sidebar = ({ addPad, exportFile }) => {
  return (
    <div id="sidebar">
      <h2>Set Scale</h2>

      <h2>Pads</h2>

      <ul>
        <li onClick={addPad}>Rectangle</li>
        <li>Circle</li>
      </ul>

      <h2 onClick={exportFile}>Export</h2>

      <div id="pad-details">
        <div className="input-group">
          <label>Pin number</label>
          <input type="text" />
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
