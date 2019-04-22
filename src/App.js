import React, { Component } from 'react';
import './App.css';
import { fabric } from 'fabric';
import Dropzone from 'react-dropzone';

import fileToBase64 from './util/fileToBase64';
import exampleImg from './util/exampleImg';
import exportKicadFootprint from './util/exportKicadFootprint';

import NullState from './components/NullState';
import Sidebar from './components/Sidebar';
import BackgroundImage from './components/BackgroundImage';
import ScaleBar from './components/ScaleBar';

import newPad from './shapes/newPad';

import { UI_STATES } from './constants';

class App extends Component {
  state = {
    image: null,
    uiState: UI_STATES.AWAITING_IMAGE,
    nextPinNum: 1,
    selectedPadPinNum: ''
  };

  setupCanvas = () => {
    this.canvas = new fabric.Canvas('canvas', { uniScaleTransform: true });
    const main = document.getElementById('main');
    this.canvas.setWidth(main.offsetWidth);
    this.canvas.setHeight(main.offsetHeight);

    const canvas = this.canvas;

    document.addEventListener('keyup', evt => {
      const key = evt.key;

      if (['Delete', 'Backspace'].includes(key)) {
        canvas.remove(canvas.getActiveObject());
      }
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

    this.setState({
      image: exampleImg,
      uiState: UI_STATES.SET_SCALE
    });
  };

  handleDrop = async acceptedFiles => {
    const b64 = await fileToBase64(acceptedFiles[0]);
    console.log(b64);
    this.setState({
      image: b64,
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

  addPad = () => {
    const { nextPinNum } = this.state;

    this.canvas.add(newPad(nextPinNum));

    this.setState({
      nextPinNum: nextPinNum + 1
    });
  };

  changeSelectedPadPinNum = evt => {
    const val = evt.target.value;
    this.setState({ selectedPadPinNum: val });

    const pad = this.canvas.getActiveObject();
    pad.pinNum = val;
    const text = pad.item(1);
    text.set('text', val);

    this.canvas.renderAll();
  };

  exportFile = () => {
    const { scalePPI } = this.state;

    exportKicadFootprint(this.canvas, scalePPI);
  };

  render() {
    const { image, uiState, selectedPadPinNum } = this.state;
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

              {!!image && <BackgroundImage imageData={image} />}

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
