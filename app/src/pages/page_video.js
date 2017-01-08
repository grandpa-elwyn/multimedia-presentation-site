import React from 'react';
import ReactDOM from 'react-dom';

import Video from '../components/media-video_embed';

export default class VideoPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var current = this.props.page;

    return (
    <div className={`${current.class} page-video`}>
      <div className="page-content-container">
      <div className="page-timeline-header">
      <h1>{current.header}</h1>
      <h2>{current.description}</h2>
      </div>
      <Video video={current} />
      </div>
    </div>

    );
  }
}
