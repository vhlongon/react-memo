import React, {Component} from 'react';

export default class Card extends Component {

  handleclick = (e) => {
    if (!this.props.flipped) {
      this.props.checkMatch(this.props.value, this.props.id);
    }
  }

  render() {
    const imgUrl = this.props.bgImage;
    const CardBackStyle = {
      backgroundImage: `url(${imgUrl})`,
      backgroundSize: 'cover'
    };
    const cardFlipped =  this.props.flipped && 'card--flipped';
    const cardMatched =  this.props.matched && 'card--matched';
    const classes = `card ${cardFlipped} ${cardMatched}`;
    const cardValue = this.props.flipped && this.props.value;
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
