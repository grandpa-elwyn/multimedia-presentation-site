import React from 'react';

export default class SnapScroller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      scrollListen: true,
      scrollTop: 0
    }
  }

  _masterHandlerUp = () => {
    if (this.state.page + 1 < this.props.pageList.length) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  _masterHandlerDown = () => {
    if (this.state.page + -1 >= 0) {
      this.setState({ page: this.state.page - 1 });
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

        let nextTop;

        if (e.target.ownerDocument) {
          nextTop = e.target.ownerDocument.body.childNodes[1].childNodes[0].childNodes[this.state.page].offsetTop;
        }
        else {
           nextTop = e.target.body.childNodes[1].childNodes[0].childNodes[this.state.page].offsetTop;
        }
        this.setState({ scrollTop: nextTop });
        window.scrollTo(0, this.state.scrollTop);

        setTimeout(() => { this.setState({ scrollListen: true }) }, 1500);
      }
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

  scrollHandler = (e) => {
    e.preventDefault();
    let scrolled = e.target.body.scrollTop;

    window.scrollTo(0, this.state.scrollTop);

    if (scrolled > this.state.scrollTop) {
      e.deltaY = 30;
      this.masterHandler(e);
    }
    else if (scrolled < this.state.scrollTop) {
      e.deltaY = -30;
      this.masterHandler(e);
    }
  }

  componentDidMount() {
    window.onwheel = this.masterHandler;
    window.onkeydown = this.keyHandler;
    window.onscroll = this.scrollHandler;
  }

  render() {

    return (
      <div>
        { this.props.pageList.map((page, i) => {
          return <section className={ i === this.state.page ? 'current-page' : '' } key={ i }>{ page }</section>;
        })}
      </div>
    );
  }
}
