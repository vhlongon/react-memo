import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
  }
  click  = () => {
    this.setState({active: !this.state.active});
  }
  render() {
    return (
      <div className={this.state.active ? 'card active' : 'card'} onClick={this.click} >
        <h4 className="card__title"> {this.props.title} </h4>
        <img src={this.props.bgImage} />
      </div>
    );
  }
}
