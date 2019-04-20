import React from 'react';

const NullState = ({ setExample }) => {
  return (
    <div id="null-state">
      <h1>Drop footprint image to begin</h1>
      <p>
        Or start with{' '}
        <a href="#" onClick={setExample}>
          an example
        </a>
      </p>
    </div>
  );
};

export default NullState;
