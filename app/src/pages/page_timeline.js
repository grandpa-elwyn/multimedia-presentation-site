import React from 'react';

import TimelineEvent from '../partials/timeline-event';

export default class TimelinePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let current = this.props.page,
        currentBg = {
          backgroundImage: `url(src/app/assets/img/${ current.img })`
        };

    return (
    <div className={`${ current.class } page-timeline`}>
      <div className="page-content-container">
      <div className="page-timeline-header">
      <h1>{ current.header }</h1>
      </div>
      {current.timeline.map((entry, i) => {
        return (<TimelineEvent key={i} event={entry} />);
      })}
      </div>
    </div>

    );
  }
}
