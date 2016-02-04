import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Card from './Card';


export default class CardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // cards: [],
      lastCard: null,
      locked: false,
      matches: 0,
      matchOver: false
    };
  }

  checkMatch = (value, id) => {
    if (this.state.locked) {
      return;
    }

    let cards = this.props.data;
    cards[id].flipped = true;
    this.setState({cards, locked: true});
    if (this.state.lastCard) {
      if (value === this.state.lastCard.value) {
        let matches = this.state.matches;
        cards[id].matched = true;
        cards[this.state.lastCard.id].matched = true;
        setTimeout(() => {
          this.setState({cards, lastCard: null, locked: false, matches: matches + 1});
          if (this.state.matches === this.props.data.length / 2) {
            //we have a winner
            this.setState({matchOver: true, matches: 0});
            setTimeout(() => {
              this.reset();
            }, 4000);
          }
        }, 1000);
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
    // setTimeout(() => {
    //   this.setState({cards: this.props.data});
    // }, 100);
  }

  renderCards = () => {
    return this.props.data.map((card, i) => {
      let shortTile = card.slug.substring(0, 10).replace(/[0-9]/g, '');
      return (
        <Card
          title={shortTile}
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

  reset = (e) => {
    if (e) {
      e.preventDefault();
    }
    this.props.resetMatch(true);
    this.setState({matchOver: false, matches: 0});
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
    let isGameOver = this.state.matches === this.props.data.length / 2 && this.props.data.length > 0,
      buttonText = isGameOver ? 'play again' : 'reset',
      buttonClass = `reset-btn ${isGameOver ? 'reset-btn--over' : 'reset-btn--on'}`,
      listClass = `cards-list ${this.state.matchOver ? 'cards-list--over' : 'cards-list--on'}`;
    return (
      <div className={listClass} >
        <ReactCSSTransitionGroup
          transitionName="c-transition"
          transitionEnterTimeout={500}
          transitionLeaveTimeout={300}>
            {this.renderCards()}
        </ReactCSSTransitionGroup>
        <div className={buttonClass} onClick={this.reset.bind(this)}>{buttonText}</div>
      </div>
    );
  }

}
