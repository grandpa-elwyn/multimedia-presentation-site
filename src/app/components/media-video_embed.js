import React from 'react';
import ReactDOM from 'react-dom';

export default class Video extends React.Component {

  constructor(props) {
    super(props);

    this.getDimensions = this.getDimensions.bind(this);
    this.constructParams = this.constructParams.bind(this);

    this.state = {
      playing: false,

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

    this.ytBase = 'https://www.youtube.com/embed/';
  }

  getDimensions() {

  }

  constructParams() {
    var paramList = this.state.parameters,
      paramKeys = Object.keys(paramList),
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
  };

  render() {
    return (
      <iframe type="text/html" width="640" height="360" src={`${this.ytBase}${this.props.video.videoId}${this.constructParams()}`} frameborder="0"></iframe>
    );
  }
}
