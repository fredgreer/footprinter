import React, { Component } from 'react';

import scaleBar from '../shapes/scaleBar';

export default class ScaleBar extends Component {
  state = {
    enteredLength: '1.00',
    barWidth: null
  };
  componentDidMount() {
    const { canvas } = this.props;

    this.bar = scaleBar();
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

    this.props.handleSubmit(scalePPI);

    canvas.remove(this.bar);
  };

  render() {
    const { enteredLength, tipLeft, tipTop } = this.state;
    return (
      <div id="scale-bar" style={{ left: tipLeft, top: tipTop }}>
        <input
          type="number"
          value={enteredLength}
          onChange={event =>
            this.setState({ enteredLength: event.target.value })
          }
          step={0.01}
        />{' '}
        mm
        <button onClick={this.handleConfirm}>OK</button>
      </div>
    );
  }
}
