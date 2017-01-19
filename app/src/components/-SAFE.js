import React from 'react';

export default class SnapScroller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      scrollListen: true
    }
  }

  keyHandler = (e) => {
    if (e.code === 'ArrowDown') {
      e.deltaY = 30;
      this.masterHandler(e);
    }
    else if (e.code === 'ArrowUp') {
      e.deltaY = -30;
      this.masterHandler(e);
    }
  }

  touchStartHandler = (e) => {
    e.preventDefault();
    if (this.state.touchCount % 3 === 0) {
      this.setState({ startTouch: e.touches[0].clientY });
    }
    else {
      this.setState({ altStartTouch: e.touches[0].clientY });
    }
    this.setState({ touchCount: this.state.touchCount + 1 });
  }

  touchEndHandler = (e) => {
    e.preventDefault();
    this.setState({ endTouch: e.changedTouches[0].clientY });
    let startTest = this.state.endTouch === this.state.startTouch || !this.state.startTouch ? this.state.altStartTouch : this.state.startTouch;

    if (startTest > this.state.endTouch) {
      e.deltaY = 30;
      this.masterHandler(e);
    }
    else if (startTest < this.state.endTouch) {
      e.deltaY = -30;
      this.masterHandler(e);
    }
    this.setState({
      touchCount: 0,
      startTouch: 0,
      altStartTouch: 0,
      endTouch: 0
    });
  }

  _masterHandlerUp = () => {
    if (this.state.page + 1 < this.props.pageList.length) {
      this.setState({
        page: this.state.page + 1,
        direction: 'up'
       });
    }
  }

  _masterHandlerDown = () => {
    if (this.state.page + -1 >= 0) {
      this.setState({
        page: this.state.page - 1,
        direction: 'down'
      });
    }
  }

  masterHandler = (e) => {

    e.preventDefault();

    if (this.state.scrollListen) {

      if (e.deltaY > 20 || e.deltaY < -20) {

        this.setState({ scrollListen: false });

        e.deltaY > 20 ? this._masterHandlerUp() : this._masterHandlerDown()

        // let tlPage = e.target.ownerDocument.body.childNodes[1].childNodes[0].childNodes[this.state.page].childNodes[0].className;
        // console.log(tlPage);

        let nextTop = e.target.ownerDocument.body.childNodes[1].childNodes[0].childNodes[this.state.page].offsetTop;

        window.scrollTo(0, nextTop);

        setTimeout(() => { this.setState({ scrollListen: true }) }, 1500);
      }
    }
  }

  componentDidMount() {
    window.onwheel = this.masterHandler;
    window.onkeydown = this.keyHandler;
    window.ontouchmove = this.touchStartHandler;
    window.ontouchend = this.touchEndHandler;
  }

  render() {

    return (
      <div>
        { this.props.pageList.map((page, i) => {
          return <section className={ i === this.state.page ? `current-page-slide-${this.state.direction}` : '' } key={ i }>{ page }</section>;
        })}
      </div>
    );
  }
}
