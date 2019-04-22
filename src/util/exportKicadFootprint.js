import { PAD_TEMPLATE, MOD_TEMPLATE } from './templates';
import FileSaver from 'file-saver';

export const findExtent = objects => {
  const top = Math.min(...objects.map(o => o.top));
  const left = Math.min(...objects.map(o => o.left));
  const bottom = Math.max(...objects.map(o => o.top + o.height * o.scaleY));
  const right = Math.max(...objects.map(o => o.left + o.width * o.scaleX));

  return [left, top, right, bottom];
};

export const findPixelCenter = extent => {
  return [(extent[0] + extent[2]) / 2, (extent[1] + extent[3]) / 2];
};

export const getPadPixelCoords = (o, pixelOrigin) => {
  const pixelCenter = [
    o.left - pixelOrigin[0] + (o.width * o.scaleX) / 2,
    o.top - pixelOrigin[1] + (o.height * o.scaleY) / 2
  ];

  return {
    ...o,
    pixelCenter
  };
};

export const getPadPhysicalCoords = (o, scalePPI) => {
  const physicalX = o.pixelCenter[0] / scalePPI;
  const physicalY = o.pixelCenter[1] / scalePPI;

  const physicalHeight = (o.height * o.scaleY) / scalePPI;
  const physicalWidth = (o.width * o.scaleX) / scalePPI;

  return {
    ...o,
    physicalX,
    physicalY,
    physicalHeight,
    physicalWidth
  };
};

export const renderPadSting = pad => {
  let angle = 0;
  if (pad.angle) {
    angle = -pad.angle;
  }

  return PAD_TEMPLATE(
    pad.pinNum,
    pad.physicalX,
    pad.physicalY,
    angle,
    pad.physicalHeight,
    pad.physicalWidth
  );
};

export const kicadModule = (name, padPhysicalCoords) => {
  const timestamp = '5C8DE84D';

  const padStrings = padPhysicalCoords.map(renderPadSting);
  const pads = padStrings.join('\n');

  return MOD_TEMPLATE(name, timestamp, pads);
};

export default function exportKicadFootprint(canvas, scalePPI, name) {
  const objects = canvas._objects;
  const pads = objects.filter(o => o.isPad);

  const pixelExtent = findExtent(pads);
  const pixelOrigin = findPixelCenter(pixelExtent);

  const padPixelCoords = pads.map(o => getPadPixelCoords(o, pixelOrigin));

  const padPhysicalCoords = padPixelCoords.map(o =>
    getPadPhysicalCoords(o, scalePPI)
  );

  name = name || 'Footprint';

  const fileContents = kicadModule(name, padPhysicalCoords);

  const blob = new Blob([fileContents], { type: 'text/plain;charset=utf-8' });
  FileSaver.saveAs(blob, `${name}.kicad_mod`);
}
