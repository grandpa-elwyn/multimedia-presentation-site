import React from 'react';
import ReactDOM from 'react-dom';

import PlayerButton from '../components/media_player-button.js';
import ProgressBar from '../components/media_player-progress.js';

let loadVid;

export default class Video extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playerWidth: 0,
      playerHeight: 0,
      progress: 0
    }
  }

  _resizeVideo = () => {
    let windowWidth;

    if (window.innerWidth > 850) {
      windowWidth = 850;
    } else {
      windowWidth = window.innerWidth;
    }
    const playerUnit = (windowWidth * .95) / 16;

    this.setState({
      playerHeight: playerUnit * 9,
      playerWidth: playerUnit * 16
    });
  }

  _checkProgress = () => {
    this.setState({ progress: (this.player.getCurrentTime() / this.state.duration) * 100});
  }

  _onPlayerStateChange = (e) => {
  // YT.PlayerState:
  //   BUFFERING: 3
  //   CUED: 5
  //   ENDED: 0
  //   PAUSED: 2
  //   PLAYING: 1
  //   UNSTARTED: -1

    if (e.data == 1) {
      this.setState({
        updateProgress: setInterval(this._checkProgress, 500),
        playState: 'playing'
       });
     }
    else if (e.data ==  2 || e.data == -1 || e.data == 5) {
     clearInterval(this.state.updateProgress);
     this.setState({ playState: 'paused'});
    }
    else if (e.data ==  0) {
     clearInterval(this.state.updateProgress);
     this.setState({ playState: 'ended'});
    }
    else {
     this.setState({ playState: 'buffering'});
    }
  }

  _onPlayerReady = (e) => {
    this.setState({
      playStatus: e.target.getPlayerState(),
      duration: e.target.getDuration()
    });
  }

  componentDidMount() {
    if (!loadVid) {
      loadVid = new Promise((r) => {
        window.onYouTubeIframeAPIReady = () => r(window.YT);
      })
    }
    loadVid.then((YT) => {
      this.player = new YT.Player (this.vidPlayer, {
        height: '100%',
        width: '100%',
        videoId: this.props.video.videoId,
        playerVars: this.props.paramSet,
        events: {
          onStateChange: this._onPlayerStateChange,
          onReady: this._onPlayerReady
        }
      });
      window.addEventListener('resize', this._resizeVideo);
    })
  }

  componentWillMount() {
    this._resizeVideo();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeVideo);
  }

  render() {

    let containerStyle = {
      width: this.state.playerWidth,
      height: this.state.playerHeight,
    }

    return (
      <div style={ containerStyle } className='video-container'>

        <ProgressBar progress={ this.state.progress } playState={ this.state.playState } media={ this.player }/>

        <PlayerButton playState={ this.state.playState } media={ this.player } />

        <div ref={(r) => { this.vidPlayer = r }}></div>

        <ProgressBar progress={ this.state.progress } playState={ this.state.playState } media={ this.player } />

      </div>
    );
  }
}

Video.defaultProps = {
  paramSet: {
    // hide controls - 1 to show
    controls: 0,
    // hide annotations - 1 to show
    iv_load_policy: 3,
    // hide youtube logo in control bar - 0 to show
    modestbranding: 1,
    // hide title and uploader before playing - 1 to show
    showinfo: 0,
    // hide related videos - 1 to show
    rel: 0
    // More options: https://developers.google.com/youtube/player_parameters
  }
}
