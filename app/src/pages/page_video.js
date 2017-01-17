import React from 'react';

import Video from '../components/media-video_embed';

export default class VideoPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let current = this.props.page;

    return (
    <div className={`${ current.class } page-video`}>
      <div className='page-content-container'>
        <div className='page-video-header'>
          <h1>{ current.header }</h1>
          <h2>{ current.description }</h2>
        </div>
      <Video video={ current } />
        <div className='page-video-footer'><a href={`https://www.youtube.com/watch?v=${current.videoId}`}>watch on youtube</a>
        </div>
      </div>
    </div>

    );
  }
}
