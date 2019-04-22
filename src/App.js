import React, { Component } from 'react';
import hotkeys from 'hotkeys-js';
import { fabric } from 'fabric';
import Dropzone from 'react-dropzone';

import './App.css';

import fileToBase64 from './util/fileToBase64';
import exampleImg from './util/exampleImg';
import exportKicadFootprint from './util/exportKicadFootprint';

import NullState from './components/NullState';
import Sidebar from './components/Sidebar';
import ScaleBar from './components/ScaleBar';

import newPad, { initPad } from './shapes/newPad';

import { UI_STATES } from './constants';

class App extends Component {
  state = {
    uiState: UI_STATES.AWAITING_IMAGE,
    nextPinNum: 1,
    selectedPadPinNum: ''
  };

  _clipboard = null;

  setupCanvas = () => {
    this.canvas = new fabric.Canvas('canvas', { uniScaleTransform: true });
    const main = document.getElementById('main');
    this.canvas.setWidth(main.offsetWidth);
    this.canvas.setHeight(main.offsetHeight);

    const canvas = this.canvas;

    const that = this;

    canvas.on('mouse:move', options => {
      canvas.pointerX = options.e.layerX;
      canvas.pointerY = options.e.layerY;
    });

    hotkeys('backspace,delete', evt => {
      canvas.remove(canvas.getActiveObject());
    });

    hotkeys('command+c,ctrl+c', evt => {
      const obj = canvas.getActiveObject();

      if (!obj) return;

      canvas.getActiveObject().clone(cloned => {
        that._clipboard = cloned;
      });
    });

    hotkeys('command+v,ctrl+v', evt => {
      if (!this._clipboard) return;

      const canvas = this.canvas;

      this._clipboard.clone(clonedObj => {
        clonedObj.set({
          top: canvas.pointerY,
          left: canvas.pointerX
        });

        initPad(clonedObj, this.getNextPinNumber());

        canvas.add(clonedObj);
        canvas.setActiveObject(clonedObj);
      });
    });

    canvas.on('object:selected', evt => {
      const pad = evt.target;

      this.setState({
        selectedPadPinNum: pad.pinNum
      });
    });
  };

  componentDidMount() {
    this.setupCanvas();
  }

  setExample = evt => {
    evt.preventDefault();

    this.setBgImage(exampleImg);

    this.setState({
      uiState: UI_STATES.SET_SCALE
    });
  };

  setBgImage = imageData => {
    const canvas = this.canvas;

    canvas._objects.filter(o => o.isBgImage).map(o => canvas.remove(o));

    fabric.Image.fromURL(imageData, imgObj => {
      const height = canvas.height - 48;
      const width = canvas.width - 48;

      let scale = height / imgObj.height;

      if (imgObj.width * scale > width) {
        scale = width / imgObj.width;
      }

      imgObj.set({
        originX: 'center',
        originY: 'center',
        top: canvas.height / 2,
        left: canvas.width / 2,
        scaleX: scale,
        scaleY: scale,
        hasControls: false,
        hasBorders: false,
        selectable: false,
        lockMovementX: true,
        lockMovementY: true,
        hoverCursor: 'default'
      });

      imgObj.isBgImage = true;

      canvas.add(imgObj);
      imgObj.sendToBack();
    });
  };

  handleDrop = async acceptedFiles => {
    const b64 = await fileToBase64(acceptedFiles[0]);

    this.setBgImage(b64);

    this.setState({
      uiState: UI_STATES.SET_SCALE
    });
  };

  setScale = () => {
    this.setState({
      uiState: UI_STATES.SET_SCALE
    });
  };

  handleScaleSubmit = scalePPI => {
    this.setState({
      scalePPI,
      uiState: UI_STATES.DRAW
    });
  };

  incrementPinNumber = () => {
    this.setState({
      nextPinNum: this.state.nextPinNum + 1
    });
  };

  getNextPinNumber = () => {
    const nextPin = this.state.nextPinNum;
    this.incrementPinNumber();

    return nextPin;
  };

  addPad = () => {
    const pad = newPad(this.getNextPinNumber());

    this.canvas.add(pad);
    this.canvas.setActiveObject(pad);

    this.incrementPinNumber();
  };

  changeSelectedPadPinNum = evt => {
    const val = evt.target.value;
    this.setState({ selectedPadPinNum: val });

    const pad = this.canvas.getActiveObject();
    initPad(pad, val);

    this.canvas.renderAll();
  };

  exportFile = () => {
    const { scalePPI } = this.state;

    exportKicadFootprint(this.canvas, scalePPI);
  };

  render() {
    const { uiState, selectedPadPinNum } = this.state;
    return (
      <Dropzone onDrop={this.handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div className="App" {...getRootProps()}>
            <Sidebar
              setScale={this.setScale}
              addPad={this.addPad}
              exportFile={this.exportFile}
              selectedPadPinNum={selectedPadPinNum}
              changeSelectedPadPinNum={this.changeSelectedPadPinNum}
            />
            <div id="main">
              {uiState === UI_STATES.AWAITING_IMAGE && (
                <NullState setExample={this.setExample} />
              )}

              {uiState === UI_STATES.SET_SCALE && (
                <ScaleBar
                  canvas={this.canvas}
                  handleSubmit={this.handleScaleSubmit}
                />
              )}

              <div>
                <canvas id="canvas" />
              </div>
            </div>
          </div>
        )}
      </Dropzone>
    );
  }
}

export default App;
