import React from 'react';
import ReactDOM from 'react-dom';

export default class PlayerButton extends React.Component {

  constructor(props) {
    super(props);
  }

  _buttonDisplay = {
    display: 'block'
  }

  _showButton = () => {
    this._buttonDisplay.display = 'block';
  }

  _togglePlay = (e) => {
    if (this.props.playState === 'playing') {
      this.props.media.pauseVideo();
    }
    else if (this.props.playState === 'buffering') {
      return;
    }
    else {
      this.props.media.playVideo();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.playState === 'playing' || nextProps.playState === 'buffering') {
      this._buttonDisplay.display = 'none';
    }
    else {
      this._buttonDisplay.display = 'block';
    }
  }

  render() {
    return (
          <div className='video-overlay' onClick={ this._togglePlay} >
            <div className='video-player-button' onClick={ this._togglePlay } style={ this._buttonDisplay }>
              <img src='app/src/assets/img/media-buttons/play.png' />
            </div>
          </div>
    );
  }
}

PlayerButton.defaultProps = {
  playState: 'paused'
}
