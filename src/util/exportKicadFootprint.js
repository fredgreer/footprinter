import { KICAD_MOD_TEMPLATE, KICAD_PAD_TEMPLATE } from './templates';
import hexUnixSeconds from './hexUnixSeconds';
import getPadsForExport from './getPadsForExport';
import saveFile from './saveFile';

export const renderPadSting = pad => {
  let angle = 0;
  if (pad.angle) {
    angle = -pad.angle;
  }

  return KICAD_PAD_TEMPLATE(
    pad.pinNum,
    pad.physicalX,
    pad.physicalY,
    angle,
    pad.physicalHeight,
    pad.physicalWidth
  );
};

export const kicadModule = (name, padPhysicalCoords) => {
  const timestamp = hexUnixSeconds();

  const padStrings = padPhysicalCoords.map(renderPadSting);
  const pads = padStrings.join('\n');

  return KICAD_MOD_TEMPLATE(name, timestamp, pads);
};

export default function exportKicadFootprint(canvas, scalePPI, name) {
  const padCoords = getPadsForExport(canvas, scalePPI);

  name = name || 'Footprint';

  const fileContents = kicadModule(name, padCoords);

  saveFile(fileContents, `${name}.kicad_mod`);
}
