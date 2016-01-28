import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: false
    };
  }
  handleclick  = (ev) => {
    this.setState({active: !this.state.active});
    this.props.onClick();
  }

  render() {
    let imgUrl = this.props.bgImage,
      CardBackStyle = {
        backgroundImage: 'url(' + imgUrl + ')',
        backgroundSize: 'cover'
      },
      activeClass = this.state.active ? 'clicked' : 'not-clicked',
      classes = `card ${activeClass}`;
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
