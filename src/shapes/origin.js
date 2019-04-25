import { fabric } from 'fabric';

function makeLine(coords) {
  return new fabric.Line(coords, {
    fill: 'red',
    stroke: 'red',
    strokeWidth: 2,
    selectable: false,
    evented: false
  });
}

export default function origin() {
  const l1 = makeLine([20, 0, 20, 40]);
  const l2 = makeLine([0, 19, 40, 19]);

  const group = new fabric.Group([l1, l2], {
    hasRotatingPoint: false,
    hasBorders: false,
    hasControls: false,
    originX: 'center',
    originY: 'center'
  });

  return group;
}
