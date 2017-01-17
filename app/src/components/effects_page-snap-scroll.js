import React from 'react';

class ScrollSnapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      page: 0,
      scrollListen: true
    }
  }

  _onScrollUp = (e) => {
    if (this.state.page + 1 < this.state.pageList.length) {
      this.setState({ page: this.state.page + 1 });
    }
  }

  _onScrollDown = (e) => {
    if (this.state.page + -1 >= 0) {
      this.setState({ page: this.state.page - 1 });
    }
  }

  _onScroll = (e) => {

    e.preventDefault();

    console.log(e);
    this.setState({ pageList: e.target.offsetParent.childNodes[1].childNodes[0].childNodes });
    console.log(this.state.pageList);

    if (this.state.scrollListen) {

      if (e.deltaY > 20 || e.deltaY < -20) {
        this.setState({ scrollListen: false });

        e.deltaY > 20 ? this._onScrollUp(e) : this._onScrollDown(e)

        let nextTop = e.target.offsetParent.childNodes[1].childNodes[0].childNodes[this.state.page].offsetTop;
        window.scrollTo(0, nextTop);

        setTimeout(() => { this.setState({ scrollListen: true }) }, 1500);
      }
    }
    else {
      return;
    }
  }

  render() {

  }
}
