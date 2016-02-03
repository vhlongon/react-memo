import React from 'react';

export default class Card extends React.Component {

  handleclick = (ev) => {
    if (!this.props.flipped) {
      this.props.checkMatch(this.props.value, this.props.id);
    }
  }

  render() {
    let imgUrl = this.props.bgImage,
      CardBackStyle = {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover'
      },
      cardFlipped =  this.props.flipped ? 'card--flipped' : '',
      cardMatched =  this.props.matched ? 'card--matched' : '',
      classes = `card ${cardFlipped} ${cardMatched}`,
      cardValue = this.props.flipped ? this.props.value : '';
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
