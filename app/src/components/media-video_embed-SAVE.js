import React from 'react';
import ReactDOM from 'react-dom';
export default class Video extends React.Component {

  constructor(props) {
    super(props);

    this._resizeVideo = this._resizeVideo.bind(this);
  }

  static defaultProps = {
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

  static propTypes = {
    paramSet: React.PropTypes.object.isRequired
  }

  state = {
    playerWidth: 0,
    playerHeight: 0,
    isLoading: true,
    isPlaying: false,
    thisPage: 1,
    paramStr: (function (params, keys = Object.keys(params)) {
      let str = '?';
      keys.map((key, i) => {
        // if (i > 0) { str += '&'; }
        str += (key + '=' + params[key] + '&');
      })
      return str;
    }(this.props.paramSet))
  }

  _resizeVideo() {
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

  // _styleIframe() {
  //   if
  // }

  componentWillMount() { this._resizeVideo() }

  componentDidMount() {
    window.addEventListener('resize', this._resizeVideo);

    this.setState({ isLoading: false });
    console.log(this.state.isLoading);
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
        <div className='video-overlay'></div>
        <iframe ref="video" type='text/html' width='100%' height='100%' src={`https://www.youtube.com/embed/${ this.props.video.videoId }${ this.state.paramStr }`}></iframe>
      </div>
    );
  }
}
