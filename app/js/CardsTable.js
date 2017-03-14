import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Card from './Card';
import CardsList from './CardsList';
import CardsForm from './CardsForm';
import loadAjax from './helpers/ajax';
import ReactDOM from 'react-dom';

export default class CardsTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      showForm: true,
      listMessage: ''
    };
  }

  createDuplicates = (arr) => {
    const doubleArray = arr
      .reduce((acc, item) => {
        item.matched = false;
        item.flipped = false;
        const clone = Object.assign({}, item, { id: `${item.id}@2`});
        return [...acc, item, clone];
      }, [])
      .sort(() => 0.5 - Math.random());

    return doubleArray;
  }

  loadGhipy = ({keyword, number}) => {
    this.setState({data: []});
    const baseUrl = 'http://api.giphy.com/v1/gifs/search?q';
    const apikey = 'dc6zaTOxFJmzC';

    loadAjax(`${baseUrl}=${keyword || 'cards'}&api_key=${apikey}&limit=${number || 1}`,
      (xhr) => {
        const cardsData = JSON.parse(xhr.responseText);
        const doubleData = this.createDuplicates(cardsData.data);

        this.setState({data: doubleData});

        setTimeout(() => {
          if (this.state.data.length > 0) {
            this.setState({
              showForm: false, 
              listMessage: ''
            });
          } else {
            this.setState({listMessage: 'Sorry, no matches. Try something else!'});
          }
        }, 300);
      }
    );
  }

  handleFormSubmit = (formData) => {
    this.loadGhipy(formData);
  }

  resetMatch = () => {
    this.setState({
      data: [], 
      showForm: true, 
      listMessage: ''
    });
  }

  render = () => (
      <ReactCSSTransitionGroup
          transitionName="c-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
          <div className="cards-table">
            <h2 className="cards-table__title">{this.props.title}</h2>
            <CardsForm onFormSubmit={this.handleFormSubmit} isVisible={this.state.showForm} />
            <div className='cards-list__message'>{this.state.listMessage}</div>
            <CardsList data={this.state.data} resetMatch={this.resetMatch} />
          </div>
      </ReactCSSTransitionGroup>
  );
}
