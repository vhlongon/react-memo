import React from 'react';

export default class CardsForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      keyword: '',
      number: ''
    };
  }

	handleKeywordChange = e => {
  	this.setState({keyword: e.target.value});
	}

	handleNumberChange = e => {
  	this.setState({number: e.target.value});
	}

  handleSubmit = e => {
    e.preventDefault();
    const keyword = this.state.keyword.trim().split(' ').join('+');
    const number   = this.state.number.trim();
    if (!keyword || !number ) {
      return;
    }
    //send request to the server
    this.props.onFormSubmit({keyword: keyword, number: number});
    this.setState({
      keyword: '', 
      number: ''
    });
  }

  render() {
    const visibility = this.props.isVisible ? 'visible' : 'hidden';
    const formClass = `cards-form cards-form--${visibility}`;
    return (
      <form className={formClass} onSubmit={this.handleSubmit}>
        <input
          type="text"
          placeholder="Choose a keyword"
        	value={this.state.keyword}
          onChange={this.handleKeywordChange}
        />
        <input
        	type="number"
          placeholder="Choose the max number of cards"
          value={this.state.number}
          onChange={this.handleNumberChange}
        />
        <input type="submit" value="Try me!" />
      </form>
    );
  }
}
