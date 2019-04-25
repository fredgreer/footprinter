export const getPads = canvas => canvas._objects.filter(o => o.isPad);

export const getPinNumbers = pads => pads.map(o => parseInt(o.pinNum));

export const getHighestPinNum = canvas => {
  const pads = getPads(canvas);

  return Math.max(Math.max(...getPinNumbers(pads)), 0);
};
