import React from 'react';

export default class SnapScroller extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      scrollListen: true
    }
  }

  _onScrollUp = () => {
    if (this.state.page + 1 < this.props.pageList.length) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  _onScrollDown = () => {
    if (this.state.page + -1 >= 0) {
      this.setState({ page: this.state.page - 1 });
    }
  }

  onScroll = (e) => {

    // console.log(e, this);

    e.preventDefault();

    if (this.state.scrollListen) {

      if (e.deltaY > 20 || e.deltaY < -20) {

        this.setState({ scrollListen: false });

        e.deltaY > 20 ? this._onScrollUp() : this._onScrollDown()

        // let tlPage = e.target.ownerDocument.body.childNodes[1].childNodes[0].childNodes[this.state.page].childNodes[0].className;
        // console.log(tlPage);

        let nextTop = e.target.ownerDocument.body.childNodes[1].childNodes[0].childNodes[this.state.page].offsetTop;
        window.scrollTo(0, nextTop);

        setTimeout(() => { this.setState({ scrollListen: true }) }, 1500);
      }
    }
  }

  onKeyHandler = (e) => {
    if (e.code === 'ArrowDown') {
      e.deltaY = 30;
      this.onScroll(e);
    }
    else if (e.code === 'ArrowUp') {
      e.deltaY = -30;
      this.onScroll(e);
    }
  }

  componentDidMount() {
    window.addEventListener('wheel', this.onScroll);
    window.onkeydown = this.onKeyHandler;
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
