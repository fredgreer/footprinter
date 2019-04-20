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
    </div>
  );
};

export default Sidebar;
