import React from 'react';

export default class CardsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  click  = () => {
    //this.setState({active: !this.state.active});
  }
  render() {
    return (
      <div className='cardForm' onClick={this.click()}>
        <p className="card__title">
        {this.props.title}
        </p>
      </div>
    );
  }
}
