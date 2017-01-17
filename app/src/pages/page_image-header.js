import React from 'react';

export default class ImagePage extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    var current = this.props.page;
    var currentBg = {
      backgroundImage: `url(app/src/assets/img/${current.img})`
    };

    return (
    <div className={`${current.class} page-image-bg`} style={ currentBg }>
    <div className={`${current.class} page-image-top`}>
      <div className="page-content-container">
        <h1>{current.header}</h1>
        <h2>{current.description}</h2>
      </div>
    </div>
    </div>

    );
  }
}
