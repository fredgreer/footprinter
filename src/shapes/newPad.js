import { fabric } from 'fabric';

export const initPad = (pad, pinNum) => {
  const label = pad.item(1);
  label.set('text', String(pinNum));

  pad.isPad = true;
  pad.pinNum = pinNum;
};

export default function newPad(pinNum = '1', left, top, width, height) {
  const rect = new fabric.Rect({
    width: width,
    height: height,
    fill: 'red'
  });

  const label = new fabric.Text('', {
    left: width / 2,
    top: height / 2,
    fontFamily: 'Arial',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    fixedWidth: width
  });

  const group = new fabric.Group([rect, label], {
    left,
    top,
    originX: 'center',
    originY: 'center',
    minScaleLimit: 0.1,
    lockScalingFlip: true
  });

  group.on('scaling', evt => {
    const text = evt.target.item(1);
    const group = evt.target;
    const scaleX = group.width / (group.width * group.scaleX);
    const scaleY = group.height / (group.height * group.scaleY);
    text.set('scaleX', scaleX);
    text.set('scaleY', scaleY);
  });

  initPad(group, pinNum);

  return group;
}
