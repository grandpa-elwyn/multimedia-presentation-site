import React from 'react';
import ReactDOM from 'react-dom';
//import $ from 'jquery';

export default class Video extends React.Component {

  constructor(props) {
    super(props);

    this.constructParams = this.constructParams.bind(this);
    this.resizeVideo = this.resizeVideo.bind(this);

    this.state = {
      initWidth: 0,
      playerUnit: 0,
      playerHeight: 0,
      playerWidth: 0
    }
  }



  constructParams() {

    const ParamList = {
      parameters: {
        // hide controls - 1 to show
        'controls': 0,
        // hide annotations - 1 to show
        'iv_load_policy': 3,
        // hide youtube logo in control bar - 0 to show
        'modestbranding': 1,
        // hide title and uploader before playing - 1 to show
        'showinfo': 0,
        // hide related videos - 1 to show
        'rel': 0
        // More options: https://developers.google.com/youtube/player_parameters
      }
    };

    var paramKeys = Object.keys(paramList),
      params = '';
  paramKeys.map(function (key) {
    if (paramKeys.indexOf(key) === 0) {
      params += '?';
    } else if (paramKeys.indexOf(key) > 0) {
      params += '&';
    }
    params += (key + '=' + paramList[key]);
  })
    return params;
  }

  resizeVideo() {
    if (window.innerWidth > 850) {
      return 840;
    }
    else {
      return window.innerWidth * .9;
    }

    this.setState({
      initWidth: windowWidth * .9,
      playerUnit: initWidth / 16,
      playerHeight: playerUnit * 9,
      playerWidth: playerUnit * 16
    })
    console.log(windowWidth, this.state.playerWidth, this.state.playerHeight);
  }

  componentWillMount() {
    this.resizeVideo();
  }

  componentDidMount() {
    window.addEventListener('resize', this.resizeVideo);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeVideo);
  }

  render() {
    return (
      <iframe type="text/html" width={this.state.playerWidth} height={this.state.playerHeight} src={`https://www.youtube.com/embed/${this.props.video.videoId}${this.constructParams()}`} frameBorder="0"></iframe>
    );
  }
}
