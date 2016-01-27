import React from 'react';

export default class Card extends React.Component {
  constructor(props) {
    super(props);
    this.state = {active: false};
  }
  handleclick  = () => {
    this.setState({active: !this.state.active});
    console.log(this.props.title);
  }
  render() {
    return (
      <div className="card" onClick={this.handleclick} >
        <h4 className="card__title"> {this.props.title} </h4>
        <img src={this.props.bgImage} />
      </div>
    );
  }
}
