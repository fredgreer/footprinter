import { fabric } from 'fabric';

export default function newPad() {
  return new fabric.Rect({
    width: 100,
    height: 100,
    left: 100,
    top: 100,
    fill: 'red'
  });
}
