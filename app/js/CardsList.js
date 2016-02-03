import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Card from './Card';


export default class CardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: [],
      lastCard: null,
      locked: false,
      matches: 0
    };
  }

  checkMatch = (value, id) => {
    if (this.state.locked) {
      return;
    }

    let cards = this.state.cards;
    cards[id].flipped = true;
    this.setState({cards, locked: true});
    if (this.state.lastCard) {
      if (value === this.state.lastCard.value) {
        let matches = this.state.matches;
        cards[id].matched = true;
        cards[this.state.lastCard.id].matched = true;
        setTimeout(() => {
          this.setState({cards, lastCard: null, locked: false, matches: matches + 1});
        }, 2000);
      } else {
        setTimeout(() => {
          cards[id].flipped = false;
          cards[this.state.lastCard.id].flipped = false;
          this.setState({cards, lastCard: null, locked: false});
        }, 1000);
      }
    } else {
      this.setState({
        lastCard: {id, value},
        locked: false
      });
    }
  }

  componentWillReceiveProps  = () => {
    setTimeout(() => {
      this.setState({cards: this.props.data});
    }, 300);
  }

  renderCards = () => {
    return this.props.data.map((card, i) => {
      return (
        <Card
          title={card.slug}
          value={card.slug}
          matched={card.matched}
          flipped={card.flipped}
          checkMatch={this.checkMatch}
          id={i}
          key={card.id}
          bgImage={card.images.original.url}
        />
      );
    });
  }

  renderContent = () => {
    let isGameOver = this.state.matches === this.state.cards.length / 2 && this.props.data.length > 0;
    console.log(isGameOver);
    if (isGameOver) {
      return  <div className="cards-list--over">Game is over</div>;
    } else {
      return this.renderCards();
    }
  }
  render() {
      // {function renderList() {
      //   if (!isGameOver) {
      //     console.log('not over yet');
      //     this.renderCards;
      //   }else {
      //     return <div className="cards-list--over">Game is over</div>;
      //   }
      // }.call(this)}
    return (
      <div className="cards-list">
        <ReactCSSTransitionGroup transitionName="c-transition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
          {this.renderContent()}
        </ReactCSSTransitionGroup>
      </div>
    );
  }

}
