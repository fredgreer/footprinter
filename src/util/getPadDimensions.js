const getPadDimensions = (pad, scaleFactor) => {
  return {
    height: ((pad.height * pad.scaleY) / scaleFactor).toFixed(3),
    width: ((pad.width * pad.scaleX) / scaleFactor).toFixed(3),
    angle: pad.angle.toFixed(1)
  };
};

export default getPadDimensions;
