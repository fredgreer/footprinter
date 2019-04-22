import exportKicadFootprint, {
  findExtent,
  findPixelCenter,
  getPadPixelCoords,
  getPadPhysicalCoords,
  renderPadSting,
  kicadModule
} from '../exportKicadFootprint';

import * as hexUnixSeconds from '../hexUnixSeconds';

import TEST_CANVAS from './data/canvas';
const TEST_SCALE_FACTOR = 120;

test('findExtent()', () => {
  expect(findExtent(TEST_CANVAS._objects)).toEqual([396, 219, 702, 651]);
});

test('findPixelCenter()', () => {
  expect(findPixelCenter([396, 219, 702, 651])).toEqual([549, 435]);
});

test('getPadPixelCoords()', () => {
  const obj = {
    left: 396,
    top: 219,
    width: 100,
    height: 100,
    scaleX: 0.8,
    scaleY: 1.22
  };
  const pixelCoords = getPadPixelCoords(obj, [549, 435]);

  expect(pixelCoords).toEqual({
    ...obj,
    pixelCenter: [-113, -155]
  });
});

test('getPadPhysicalCoords()', () => {
  const obj = {
    left: 396,
    top: 219,
    width: 100,
    height: 100,
    scaleX: 0.8,
    scaleY: 1.22,
    pixelCenter: [-113, -155]
  };
  const physicalCoords = getPadPhysicalCoords(obj, TEST_SCALE_FACTOR);

  expect(physicalCoords).toEqual({
    ...obj,
    physicalX: -0.9416666666666667,
    physicalY: -1.2916666666666667,
    physicalHeight: 1.0166666666666666,
    physicalWidth: 0.6666666666666666
  });
});

test('renderPadSting', () => {
  const pad = {
    pinNum: 1,
    physicalX: -0.94166,
    physicalY: -1.29166,
    physicalHeight: 1.016,
    physicalWidth: 0.666
  };

  expect(renderPadSting(pad))
    .toEqual(`  (pad 1 smd rect (at -0.94166 -1.29166 0) (size 0.666 1.016) (layers F.Cu)
    (zone_connect 0))`);
});

test('kicadModule', () => {
  const pads = [
    {
      pinNum: 1,
      physicalX: -0.94166,
      physicalY: -1.29166,
      physicalHeight: 1.016,
      physicalWidth: 0.666
    },
    {
      pinNum: 2,
      physicalX: 0.94166,
      physicalY: 1.29166,
      physicalHeight: 2.13,
      physicalWidth: 1.23
    }
  ];

  hexUnixSeconds.default = jest.fn().mockReturnValue('5C8DE84D');

  const mod = kicadModule('part name', pads);

  expect(mod).toEqual(`(module "part name" (layer F.Cu) (tedit 5C8DE84D)
  (fp_text reference REF** (at 0 0.5) (layer F.SilkS)
    (effects (font (size 1 1) (thickness 0.15)))
  )
  (fp_text value "part name" (at 0 -0.5) (layer F.Fab)
    (effects (font (size 1 1) (thickness 0.15)))
  )
  (pad 1 smd rect (at -0.94166 -1.29166 0) (size 0.666 1.016) (layers F.Cu)
    (zone_connect 0))
  (pad 2 smd rect (at 0.94166 1.29166 0) (size 1.23 2.13) (layers F.Cu)
    (zone_connect 0))
)`);
});
