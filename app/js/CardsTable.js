import React from 'react';
import Card from './Card';
import CardsList from './CardsList';
import CardsForm from './CardsForm';
import loadAjax from './helpers/ajax';

import ReactDOM from 'react-dom';

export default class CardsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: []};
  }

  loadGhipy = (data) => {
    let baseUrl = 'http://api.giphy.com/v1/gifs/search?q',
      keyword= data.keyword,
      limit = data.number,
      apikey = 'dc6zaTOxFJmzC';
    loadAjax(`${baseUrl}=${keyword}&api_key=${apikey}&limit=${limit}`,
      (xhr) => {
        let cardsData = JSON.parse(xhr.responseText);
        this.setState({data: cardsData.data});
      }
    );
  }

  handleFormSubmit = (formData) => {
    this.loadGhipy(formData);
  }

  componentDidMount = () => {
    //this.loadGhipy();
  }
  render = () => {
    return (
      <div className="gametable">
        <h2 className="gametale__title">{this.props.title}</h2>
        <CardsForm onFormSubmit={this.handleFormSubmit} />
        <CardsList data={this.state.data} />
      </div>
    );
  }
}
