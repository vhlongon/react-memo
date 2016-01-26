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
      <div className={this.state.active ? 'card active' : 'card'} onClick={this.click()}>
        <p className="card__title">
        {this.props.title}
        </p>
      </div>
    );
  }
}
