import React from 'react';
import {render} from 'react-dom';

import {ImgContent} from './assets/content_image-page';
import ImagePage from './pages/page_image-header';
import {TlContent} from './assets/content_timeline-page';
import TimelinePage from './pages/page_timeline';
import {HdContent} from './assets/content_header-page';
import HeaderPage from './pages/page_frame-header';

class BandBio extends React.Component {

  render() {
    return (
    <div>
      <ImagePage page={ImgContent.page_1} />
      <TimelinePage page={TlContent.page_2} />
      <HeaderPage page={HdContent.page_3} />
      <ImagePage page={ImgContent.page_4} />
    </div>
    );
  }
}

render(<BandBio />, document.getElementById('app'));
