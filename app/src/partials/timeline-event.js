import React from 'react';
import ReactDOM from 'react-dom';

export default class TimelineEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="event-container">
        <div className="event-date">
          <h2>{this.props.event.date}</h2>
          <div className="date-box-line"></div>
          <div className="event-dot"></div>
        </div>
        <div className="event-text">
        {this.props.event.description}
        </div>
      </div>
    );
  }
}
