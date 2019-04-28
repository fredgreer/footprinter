import React from 'react';

const NullState = ({ setExample }) => {
  return (
    <div id="null-state">
      <h1>Drop footprint image to begin</h1>
      <p>
        Or start with <button onClick={setExample}>an example</button>
      </p>
    </div>
  );
};

export default NullState;
