import React from 'react';
import ReactDOM from 'react-dom';

import TimelineEvent from '../partials/timeline-event';

export default class TimelinePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var current = this.props.page;
    var currentBg = {
      backgroundImage: `url(src/app/assets/img/${current.img})`
    };

    return (
    <div className={`${current.class} page-timeline`}>
      <div className="page-content-container">
      <div className="page-timeline-header">
      <h1>{current.header}</h1>
      </div>
      {current.timeline.map(function(entry) {
        return (<TimelineEvent event={entry} />);
      }, this)}
      </div>
    </div>

    );
  }
}
