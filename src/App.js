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
    uiState: UI_STATES.AWAITING_IMAGE
  };

  setupCanvas = () => {
    this.canvas = new fabric.Canvas('canvas', { uniScaleTransform: true });
    const main = document.getElementById('main');
    this.canvas.setWidth(main.offsetWidth);
    this.canvas.setHeight(main.offsetHeight);
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

  handleScaleSubmit = scalePPI => {
    this.setState({
      scalePPI,
      uiState: UI_STATES.DRAW
    });
  };

  addPad = () => {
    this.canvas.add(newPad());
  };

  exportFile = () => {
    const { scalePPI } = this.state;

    exportKicadFootprint(this.canvas, scalePPI);
  };

  render() {
    const { image, uiState } = this.state;
    return (
      <Dropzone onDrop={this.handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <div className="App" {...getRootProps()}>
            <Sidebar addPad={this.addPad} exportFile={this.exportFile} />
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
