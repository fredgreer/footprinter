import React, { Component } from 'react';
import hotkeys from 'hotkeys-js';
import { fabric } from 'fabric';
import Dropzone from 'react-dropzone';

import './App.css';

import fileToBase64 from './util/fileToBase64';
import exampleImg from './util/exampleImg';
import exportKicadFootprint from './util/exportKicadFootprint';
import getPadDimensions from './util/getPadDimensions';

import NullState from './components/NullState';
import Sidebar from './components/Sidebar';
import ScaleBar from './components/ScaleBar';

import newPad, { initPad } from './shapes/newPad';
import origin from './shapes/origin';

import { UI_STATES } from './constants';

const INITIAL_STATE = {
  uiState: UI_STATES.AWAITING_IMAGE,
  scalePPI: null,
  nextPinNum: 1,
  selectedPadPinNum: '',
  selectedPadDimensions: null,
  footprintName: '',
  originPixelCoords: null,
  offsetLocked: false,
  showOrigin: false,
  scaleBar: {
    left: 100,
    top: 300,
    scaleX: 1,
    enteredLength: '1.00'
  }
};

class App extends Component {
  constructor() {
    super();

    this.state = Object.assign({}, INITIAL_STATE);
  }
  state = INITIAL_STATE;

  _clipboard = null;

  setupCanvas = () => {
    this.canvas = new fabric.Canvas('canvas', { uniScaleTransform: true });
    const main = document.getElementById('main');
    this.canvas.setWidth(main.offsetWidth);
    this.canvas.setHeight(main.offsetHeight);

    const canvas = this.canvas;

    this.setupOrigin();

    const that = this;

    canvas.on('mouse:move', options => {
      canvas.pointerX = options.e.layerX;
      canvas.pointerY = options.e.layerY;
    });

    hotkeys('backspace,delete', evt => {
      const obj = canvas.getActiveObject();
      if (obj && obj.isPad) {
        canvas.remove(obj);
      }
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

    const handleSelection = evt => {
      const { scalePPI } = this.state;

      const pad = this.canvas.getActiveObject();

      if (!pad) {
        return this.setState({
          selectedPadPinNum: null,
          selectedPadDimensions: null
        });
      }

      this.setState({
        selectedPadPinNum: pad.pinNum,
        selectedPadDimensions: getPadDimensions(pad, scalePPI)
      });
    };

    canvas.on('object:selected', handleSelection);
    canvas.on('selection:updated', handleSelection);
    canvas.on('selection:cleared', handleSelection);
  };

  setupOrigin = () => {
    const canvas = this.canvas;

    const ori = origin();
    ori.set({
      left: canvas.width / 2,
      top: canvas.height / 2,
      selectable: false,
      opacity: 0
    });

    canvas.add(ori);
    ori.moveTo(999);

    this.setState({
      originPixelCoords: [canvas.width / 2, canvas.height / 2]
    });

    this.origin = ori;
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

  handleScaleSubmit = (scalePPI, scaleBar) => {
    this.setState({
      scalePPI,
      scaleBar,
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

  toggleOrigin = () => {
    const { showOrigin } = this.state;

    if (showOrigin) {
      this.origin.set({
        opacity: 0,
        selectable: false
      });
    } else {
      this.origin.set({
        opacity: 1,
        selectable: true
      });
    }

    this.setState({ showOrigin: !showOrigin });

    this.canvas.renderAll();
  };

  changeSelectedPadPinNum = evt => {
    const val = evt.target.value;
    this.setState({ selectedPadPinNum: val });

    const pad = this.canvas.getActiveObject();
    initPad(pad, val);

    this.canvas.renderAll();
  };

  changePinDimension = (evt, type) => {
    const { scalePPI } = this.state;
    const pad = this.canvas.getActiveObject();

    const val = evt.target.value;

    if (type === 'width') {
      this.setState({
        selectedPadDimensions: {
          ...this.state.selectedPadDimensions,
          width: val
        }
      });
      pad.scaleX = (parseFloat(val) * scalePPI) / pad.width;
    } else if (type === 'height') {
      this.setState({
        selectedPadDimensions: {
          ...this.state.selectedPadDimensions,
          height: val
        }
      });
      pad.scaleY = (parseFloat(val) * scalePPI) / pad.height;
    } else if (type === 'angle') {
      this.setState({
        selectedPadDimensions: {
          ...this.state.selectedPadDimensions,
          angle: val
        }
      });
      pad.angle = parseFloat(val);
    }

    pad.trigger('scaling', { target: pad });
    this.canvas.renderAll();
  };

  setFootprintName = evt => {
    const val = evt.target.value;
    this.setState({ footprintName: val });
  };

  exportFile = () => {
    const { scalePPI, footprintName } = this.state;

    exportKicadFootprint(this.canvas, scalePPI, footprintName);
  };

  resetWorkspace = () => {
    const msg =
      'Are you sure you want to clear the workspace? All changes will be lost.';

    if (window.confirm(msg)) {
      this.setState(INITIAL_STATE);
      this.canvas.clear();
    }
  };

  render() {
    const {
      uiState,
      selectedPadPinNum,
      selectedPadDimensions,
      footprintName,
      scaleBar
    } = this.state;
    return (
      <Dropzone onDrop={this.handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div className="App" {...getRootProps()}>
            <Sidebar
              setScale={this.setScale}
              addPad={this.addPad}
              toggleOrigin={this.toggleOrigin}
              exportFile={this.exportFile}
              selectedPadPinNum={selectedPadPinNum}
              selectedPadDimensions={selectedPadDimensions}
              changeSelectedPadPinNum={this.changeSelectedPadPinNum}
              footprintName={footprintName}
              setFootprintName={this.setFootprintName}
              changePinDimension={this.changePinDimension}
              resetWorkspace={this.resetWorkspace}
            />
            <div id="main">
              {uiState === UI_STATES.AWAITING_IMAGE && (
                <NullState setExample={this.setExample} />
              )}

              {uiState === UI_STATES.SET_SCALE && (
                <ScaleBar
                  canvas={this.canvas}
                  handleSubmit={this.handleScaleSubmit}
                  scaleBar={scaleBar}
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