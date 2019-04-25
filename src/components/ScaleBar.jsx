import React, { Component } from 'react';

import newScaleBar from '../shapes/newScaleBar';

export default class ScaleBar extends Component {
  state = {
    enteredLength: '',
    barWidth: null
  };
  componentDidMount() {
    const { canvas, scaleBar } = this.props;

    const { left, top, scaleX, enteredLength } = scaleBar;

    this.setState({ enteredLength });

    this.bar = newScaleBar(left, top, scaleX);
    this.bar.on('moving', this.handleMove);
    this.bar.on('scaling', this.handleMove);
    this.handleMove({ target: this.bar });

    canvas.add(this.bar);
  }

  handleMove = evt => {
    const tipW = document.getElementById('scale-bar').offsetWidth;
    const barW = evt.target.width * evt.target.scaleX;

    const center = evt.target.left + barW / 2;
    const tipLeft = center - tipW / 2;

    this.setState({
      barWidth: barW,
      tipLeft,
      tipTop: evt.target.top - 60
    });
  };

  handleConfirm = () => {
    const { canvas } = this.props;
    const { enteredLength, barWidth } = this.state;

    const scalePPI = barWidth / enteredLength;

    const scaleBar = {
      left: this.bar.left,
      top: this.bar.top,
      scaleX: this.bar.scaleX,
      enteredLength
    };

    this.props.handleSubmit(scalePPI, scaleBar);

    canvas.remove(this.bar);
  };

  handleKeyUp = evt => {
    if (evt.key === 'Enter') {
      this.handleConfirm();
    }
  };

  render() {
    const { enteredLength, tipLeft, tipTop } = this.state;
    return (
      <div id="scale-bar" style={{ left: tipLeft, top: tipTop }}>
        <input
          type="number"
          value={enteredLength}
          onChange={evt => this.setState({ enteredLength: evt.target.value })}
          onKeyUp={this.handleKeyUp}
          step={0.01}
        />{' '}
        mm
        <button onClick={this.handleConfirm}>OK</button>
      </div>
    );
  }
}
