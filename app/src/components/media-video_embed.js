import React from 'react';
import ReactDOM from 'react-dom';
//import $ from 'jquery';

export default class Video extends React.Component {

  constructor(props) {
    super(props);

    this._constructParams = this._constructParams.bind(this);
    this._resizeVideo = this._resizeVideo.bind(this);

    this.state = {
      playerWidth: 0,
      playerHeight: 0,
      isLoading: true
    }
  }



  _constructParams() {

    const paramList = {
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
      };

    const paramKeys = Object.keys(paramList);
    let params = '';

  paramKeys.map((key) => {
    if (paramKeys.indexOf(key) === 0) {
      params += '?';
    } else if (paramKeys.indexOf(key) > 0) {
      params += '&';
    }
    params += (key + '=' + paramList[key]);
  })
    console.log(params);
    return params;
  }

  _resizeVideo() {
    let windowWidth;

    if (window.innerWidth > 850) {
      windowWidth = 850;
    } else {
      windowWidth = window.innerWidth;
    }
    const playerUnit = (windowWidth * .9) / 16;

    this.setState({
      playerHeight: playerUnit * 9,
      playerWidth: playerUnit * 16
    });
  }

  componentWillMount() { this._resizeVideo() }

  componentDidMount() {
    window.addEventListener('resize', this._resizeVideo);

    setTimeout(() => this.setState({ isLoading: false }), 0);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this._resizeVideo);
  }

  render() {
    return (
      <iframe type='text/html' width={ this.state.playerWidth } height={ this.state.playerHeight } src={`https://www.youtube.com/embed/${ this.props.video.videoId }${ this._constructParams() }`} frameBorder='0'></iframe>
    );
  }
}
