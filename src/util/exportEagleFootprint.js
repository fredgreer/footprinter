import { EAGLE_LIB_TEMPLATE, EAGLE_PAD_TEMPLATE } from './templates';
import getPadsForExport from './getPadsForExport';
import saveFile from './saveFile';

export const renderPadSting = pad => {
  let angle = 0;
  if (pad.angle) {
    angle = -pad.angle;
  }

  return EAGLE_PAD_TEMPLATE(
    pad.pinNum,
    pad.physicalX,
    pad.physicalY,
    angle,
    pad.physicalHeight,
    pad.physicalWidth
  );
};

export const eagleLibrary = (name, padPhysicalCoords) => {
  const padStrings = padPhysicalCoords.map(renderPadSting);
  const pads = padStrings.join('\n');

  return EAGLE_LIB_TEMPLATE(name, pads);
};

export default function exportEagleFootprint(canvas, scalePPI, name) {
  const padCoords = getPadsForExport(canvas, scalePPI);

  name = name || 'Footprint';

  name = name.replace(/\s/g, '_');

  const fileContents = eagleLibrary(name, padCoords);

  saveFile(fileContents, `${name}.lbr`);
}
