import React from 'react';

export default class SnapScroller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      scrollListen: true,
      startTouch: []
    }
  }

  _keyHandler = (e) => {
    if (e.code === 'ArrowDown') {
      e.deltaY = 30;
      this.masterHandler(e);
    }
    else if (e.code === 'ArrowUp') {
      e.deltaY = -30;
      this.masterHandler(e);
    }
  }

  _touchStartHandler = (e) => {
    e.preventDefault();
    let arr = this.state.startTouch;
    arr.push(e.touches[0].clientY);
    this.setState({ startTouch: arr });
  }

  _touchEndHandler = (e) => {
    this.setState({ endTouch: e.changedTouches[0].clientY });

    if (this.state.startTouch[0] > this.state.endTouch + 30) {
      e.deltaY = 30;
      this.masterHandler(e);
    }
    else if (this.state.startTouch[0] < this.state.endTouch + 30) {
      e.deltaY = -30;
      this.masterHandler(e);
    }
    this.setState({
      startTouch: [],
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
    window.onkeydown = this._keyHandler;
    window.ontouchmove = this._touchStartHandler;
    window.ontouchend = this._touchEndHandler;
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
