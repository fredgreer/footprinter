import { fabric } from 'fabric';

export default function newPad(pinNum = '1') {
  const rect = new fabric.Rect({
    width: 100,
    height: 160,
    fill: 'red'
  });

  const label = new fabric.Text(String(pinNum), {
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
    top: 125
  });

  group.on('scaling', evt => {
    const text = evt.target.item(1);
    const group = evt.target;
    const scaleX = group.width / (group.width * group.scaleX);
    const scaleY = group.height / (group.height * group.scaleY);
    text.set('scaleX', scaleX);
    text.set('scaleY', scaleY);
  });

  group.pinNum = pinNum;

  return group;
}
