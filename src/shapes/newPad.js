import { fabric } from 'fabric';

export const initPad = (pad, pinNum) => {
  const label = pad.item(1);
  label.set('text', String(pinNum));

  pad.isPad = true;
  pad.pinNum = pinNum;
};

export default function newPad(pinNum = '1') {
  const rect = new fabric.Rect({
    width: 100,
    height: 160,
    fill: 'red'
  });

  const label = new fabric.Text('', {
    left: 50,
    top: 80,
    fontFamily: 'Arial',
    textAlign: 'center',
    originX: 'center',
    originY: 'center',
    fixedWidth: 100
  });

  const group = new fabric.Group([rect, label], {
    left: 75,
    top: 125,
    hasRotatingPoint: false
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
