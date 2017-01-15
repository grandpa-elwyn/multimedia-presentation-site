import React from 'react';
import ReactDOM from 'react-dom';

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
    switch(e.data) {
      case YT.PlayerState.ENDED: {
        clearInterval(this.state.updateProgress);
        this.setState({ playState: 'unset' });
        console.log('ended');
        // SHOW PLAY BUTTON W/RESET IMAGE
           break;
         }
      case YT.PlayerState.PLAYING: {
          this.setState({
            updateProgress: setInterval(this._checkProgress, 500),
            playState: 'running'
           });
          console.log(this.state.playState);
          // HIDE PLAY BUTTON
           break;
         }
      case YT.PlayerState.PAUSED: {
        clearInterval(this.state.updateProgress);
        this.setState({ playState: 'paused' });
        console.log('paused');
           break;
         }
      case YT.PlayerState.BUFFERING: {
        this.setState({ playState: 'paused' });
        console.log('buffering');
           break;
         }
      case YT.PlayerState.CUED: {
        this.setState({ playState: 'unset' });
        console.log('cued');
        // SHOW PLAY BUTTON
           break;
         }
      default:
        return;
    }
  }

  _playButton = () => {
    this.player.a.previousSibling.childNodes[0].style.display = 'none';
    this.player.playVideo();
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

        <ProgressBar progress={ this.state.progress } duration={ this.state.duration } playState={ this.state.playState } media={ this.player }/>

        <div className='video-overlay'>
          <div className='video-player-button' onClick={this._playButton}><span>&#9744;</span></div>
        </div>

        <div ref={(r) => { this.vidPlayer = r }}></div>

        <ProgressBar progress={ this.state.progress } duration={ this.state.duration } playState={ this.state.playState } media={ this.player }/>

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
