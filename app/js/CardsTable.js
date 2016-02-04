import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Card from './Card';
import CardsList from './CardsList';
import CardsForm from './CardsForm';
import loadAjax from './helpers/ajax';

import ReactDOM from 'react-dom';

export default class CardsTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showForm: true
    };
  }

  createDuplicates = (arr) => {
    let doubleArr = arr.slice(0);
    for (let obj of arr) {
      //and add matched and flipped properties for every card object
      obj.matched = false;
      obj.flipped = false;
      let clone = JSON.parse(JSON.stringify(obj));
      clone.id = `${obj.id}@2`;
      doubleArr.push(clone);
    }
    // randomize the cards
    doubleArr.sort(function randomizeArray() { return 0.5 - Math.random(); });
    return doubleArr;
  }

  loadGhipy = (data) => {
    this.setState({data: []});
    let baseUrl = 'http://api.giphy.com/v1/gifs/search?q',
      keyword = data.keyword || 'cards',
      limit = data.number || 1,
      apikey = 'dc6zaTOxFJmzC';
    loadAjax(`${baseUrl}=${keyword}&api_key=${apikey}&limit=${limit}`,
      (xhr) => {
        let cardsData = JSON.parse(xhr.responseText),
          doubleData = this.createDuplicates(cardsData.data);
        this.setState({data: doubleData});
      }
    );
  }

  handleFormSubmit = (formData) => {
    this.setState({data: [], showForm: false});
    this.loadGhipy(formData);
  }

  resetMatch = (b) => {
    if (b) {
      this.setState({data: [], showForm: true});
    }
  }

  componentDidMount = () => {
    // let dummyData = [];
    // this.loadGhipy(dummyData);
  }
  render = () => {
    return (
      <ReactCSSTransitionGroup
          transitionName="c-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <div className="cards-table">
            <h2 className="cards-table__title">{this.props.title}</h2>
            <CardsForm onFormSubmit={this.handleFormSubmit} isVisible={this.state.showForm} />
            <CardsList data={this.state.data} resetMatch={this.resetMatch} />
          </div>
      </ReactCSSTransitionGroup>
    );
  }
}
