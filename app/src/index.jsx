import React from 'react';
import {render} from 'react-dom';

import {ImgContent} from './assets/content_image-page';
import ImagePage from './pages/page_image-header';

import {TlContent} from './assets/content_timeline-page';
import TimelinePage from './pages/page_timeline';

import {HdContent} from './assets/content_header-page';
import HeaderPage from './pages/page_frame-header';

import {VidContent} from './assets/content_video-page';
import VideoPage from './pages/page_video';

import SnapScroller from './components/effects_page-snap-scroll';

class BandBio extends React.Component {
  constructor(props) {
    super(props);
  }

  pageList = [
    <ImagePage page={ ImgContent[0] } />, // intro
    <TimelinePage page={ TlContent[0] } />, // formation and early sound
    <HeaderPage page={ HdContent[0] } />, // no official recordings
    <VideoPage page={ VidContent[0] } />, // early recordings
    <ImagePage page={ ImgContent[1] } />, // sound and shows
    <TimelinePage page={ TlContent[1] } />, // TL use of visual aids
    <HeaderPage page={ HdContent[1] } />, // language
    <VideoPage page={ VidContent[1] } />, // 1985-1988 live
    <ImagePage page={ ImgContent[2] } />, // IMG hijacking
    <HeaderPage page={ HdContent[2] } />, // HEADER mizutani reclusive
      // TL
      // VID 1977 concert
      // TL 1980 mars studio, french demos
    <VideoPage page={ VidContent[2] } />, // 1982 keio university
      // IMG later years
    <VideoPage page={ VidContent[3] } />, // ethan mousike
      // HEADER
      // TL sources
  ];

  render() {

    return (
      <SnapScroller pageList={ this.pageList } />
    );
  }
}

render(<BandBio />, document.getElementById('app'));
