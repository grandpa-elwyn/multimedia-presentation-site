import React from 'react';

export default class TimelineEvent extends React.Component {
  constructor(props) {
    super(props);
  }

  hideDate = {
    display: 'none'
  };

  showDate = {
    display: 'inherit'
  };

  render() {
    return (
      <div className='event-container'>
        <div className='event-date'>
          <h2 style={ this.props.event.date ? this.showDate : this.hideDate }>{ this.props.event.date }</h2>
          <div className='date-box-line' style={ this.props.event.date ? this.showDate : this.hideDate }></div>
          <div className='event-dot'></div>
        </div>
        <div className='event-text'>
          <span>
            { this.props.event.description }
          </span>
        </div>
      </div>
    );
  }
}
