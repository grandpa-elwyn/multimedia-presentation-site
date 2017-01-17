import React from 'react';

export default class ProgressBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      completionWidth: '0%',
      containerHeight: '',
      containerMargin: ''
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
    this.setState({ hoverTime: this._formatTime(this._getPosition(e)) });
  }

  _setPosition = (e) => {
    let clickTime = this._getPosition(e);
    this.props.media.seekTo(clickTime);
  }

  componentWillReceiveProps(nextProps) {
    let newProgressWidth = nextProps.progress + '%';
    this.setState({ completionWidth: newProgressWidth });
    let newPlayerHeight = nextProps.media.a.clientHeight + 30;
    this.setState({ containerHeight: newPlayerHeight });
  }

  render() {
  let containerStyle = {
      height: this.state.containerHeight
    },
    barStyle = {
      width: this.state.completionWidth,
      height: this.state.containerHeight
    };

    return (
      <div className='progress-bar-container' onClick={ this._setPosition } onMouseMove={ this._showPosition } title={ this.state.hoverTime } style={ containerStyle }>
        <div className='progress-bar' style={ barStyle }></div>
      </div>
    );
  }
}
