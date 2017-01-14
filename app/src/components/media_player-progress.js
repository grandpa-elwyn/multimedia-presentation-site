import React from 'react';
import ReactDOM from 'react-dom';

export default class ProgressBar extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      playState: 'paused'
    }
  }

  componentDidMount() {
    this._setAnimationStyle();
  }

  componentWillMount() {

  }

  componentWillUnmount() {

  }

// animation-name: none                 progress
// animation-duration: 0s               this.props.duration
// animation-timing-function: ease      linear
// animation-delay: 0s                  0
// animation-iteration-count: 1         1
// animation-direction: normal          normal
// animation-fill-mode: none            forwards
// animation-play-state: running        -------

_getPosition = (e) => {
  console.log(e.layerX);
}

_setAnimationStyle = () => {
  Object.keys(this.props.animationStyle).map((prefix) => {
    this.props.animationStyle[prefix] = `progress ${ this.props.duration }s linear forwards ${ this.props.playState }`
  })
}

  render() {
    this._setAnimationStyle();
    return (
      <div className='progress-bar-container'>
        <div className='progress-bar' style={ this.props.animationStyle } ></div>
      </div>
    );
  }
}

ProgressBar.defaultProps = {
  duration: 0,
  animationStyle: {
    WebkitAnimation: '',
    MozAnimation: '',
    msAnimation: '',
    animation: ''
  }
}

ProgressBar.propTypes = {
  duration: React.PropTypes.number,
  elapsed: React.PropTypes.func,
  animationStyle: React.PropTypes.object
}
