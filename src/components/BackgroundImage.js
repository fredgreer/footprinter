import React from 'react';

const BackgroundImage = ({ imageData }) => {
  const style = {};

  if (imageData) {
    style.backgroundImage = `url('${imageData}')`;
  }

  return <div id="bg" style={style} />;
};

export default BackgroundImage;
