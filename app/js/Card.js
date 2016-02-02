import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  handleclick  = (ev) => {
    this.props.onClick();
    this.setState({active: !this.state.active});
  }

  componentDidUpdate  = () => {

  }

  componentWillReceiveProps  = () => {
    // if (this.props.flipBack) {
    //   this.setState({active: false});
    // }
  }

  render() {
    let imgUrl = this.props.bgImage,
      CardBackStyle = {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover'
      },
      hit = (this.props.hit) ? 'hit' : '',
      activeClass = this.state.active ? 'clicked' : 'not-clicked',

      classes = `card ${activeClass} ${hit}`;
    return (
      <div className={classes} onClick={this.handleclick} >
        <div className="card__container">
          <div className="card__front"></div>
          <div className="card__back" style={CardBackStyle}>
            <h4 className="card__title"> {this.props.title} </h4>
          </div>
        </div>
      </div>
    );
  }
}
