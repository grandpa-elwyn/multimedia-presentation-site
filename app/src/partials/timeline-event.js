import React from 'react';

export default class TimelineEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="event-container">
        <div className="event-date">
          <h2>{ this.props.event.date }</h2>
          <div className="date-box-line"></div>
          <div className="event-dot"></div>
        </div>
        <div className="event-text">
          <span>
            { this.props.event.description }
          </span>
        </div>
      </div>
    );
  }
}
