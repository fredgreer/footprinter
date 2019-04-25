import { fabric } from 'fabric';

function makeLine(coords) {
  return new fabric.Line(coords, {
    fill: 'black',
    stroke: 'black',
    strokeWidth: 2,
    selectable: false,
    evented: false
  });
}

export default function newScaleBar(left, top, scaleX) {
  const l1 = makeLine([100, 100, 200, 100]);
  const l2 = makeLine([100, 90, 100, 110]);
  const l3 = makeLine([200, 90, 200, 110]);

  const group = new fabric.Group([l1, l2, l3], {
    left,
    top,
    scaleX,
    hasRotatingPoint: false,
    hasBorders: false
  });

  group.setControlsVisibility({
    tl: false,
    tr: false,
    bl: false,
    br: false,
    mt: false,
    mb: false
  });

  return group;
}
