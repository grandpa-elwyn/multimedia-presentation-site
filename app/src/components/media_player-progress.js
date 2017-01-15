import React from 'react';
import ReactDOM from 'react-dom';

export default class ProgressBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completionWidth: {
        width: '0%'
      }
    }
  }

  _formatTime(t) {
    var hr = Math.floor(t / 3600),
        min = Math.floor((t % 3600) / 60),
        sec = Math.round((t % 3600) % 60);

    if (sec < 10) { sec = '0' + sec };

    if (t >= 3600) {
        if (min < 10) {min = '0' + min};
        return hr + ':' + min + ':' + sec;
    }
    else {
      return min + ':' + sec;
    }
  }

  _getPosition = (e) => {
    let parentDiv = e.target.offsetParent,
        clickPosition = e.pageX - parentDiv.offsetLeft,
        clickPercent = clickPosition / parentDiv.scrollWidth;
    return this.props.media.getDuration() * clickPercent;
  }

  _showPosition = (e) => {
    console.log((this._formatTime(this._getPosition(e))));
  }

  _setPosition = (e) => {
    let clickTime = this._getPosition(e);
    this.props.media.seekTo(clickTime);
    console.log(clickTime, this.props.media);
  }

  componentWillReceiveProps(nextProps) {
    let newPlayerWidth = nextProps.progress + '%';
    this.setState({ completionWidth: { width: newPlayerWidth }});
  }

  render() {
    return (
      <div className='progress-bar-container' onClick={ this._setPosition } onMouseEnter={ this._showPosition }>
        <div className='progress-bar' style={ this.state.completionWidth }></div>
      </div>
    );
  }
}
