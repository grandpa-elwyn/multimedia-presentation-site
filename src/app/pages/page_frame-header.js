import React from 'react';
import ReactDOM from 'react-dom';

export default class HeaderPage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var current = this.props.page;

    return (
  <div className={`${current.class} header-page`}>
    <div className='page-content-container'>
      <div className="bracket-top"></div>
      <div className="header-block">
        {current.header_block()}
      </div>
      <div className="bracket-bottom"></div>
    </div>
  </div>
    );
  }
}
