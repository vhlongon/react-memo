import React, {Component} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Card from './Card';


export default class CardsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastCard: null,
      locked: false,
      matches: 0,
      matchOver: false
    };
  }

  checkMatch = (value, id) => {
    if (this.state.locked) return;

    const cards = this.props.data;
    cards[id].flipped = true;
    this.setState({
      cards, 
      locked: true
    });

    if (this.state.lastCard) {
      if (value === this.state.lastCard.value) {
        const matches = this.state.matches;
        cards[id].matched = true;
        cards[this.state.lastCard.id].matched = true;
        setTimeout(() => {
          this.setState({
            cards, lastCard: null, 
            locked: false, 
            matches: matches + 1
          });

          if (this.state.matches === this.props.data.length / 2) {
            //we have a winner
            this.setState({
              matchOver: true, 
              matches: 0}
            );

            setTimeout(() => {
              this.reset();
            }, 4000);
          }
        }, 1000);
      } else {
        setTimeout(() => {
          cards[id].flipped = false;
          cards[this.state.lastCard.id].flipped = false;

          this.setState({
            cards, 
            lastCard: null, 
            locked: false}
          );
        }, 1000);
      }
    // Not the last card so just update the state for the current card
    } else {
      this.setState({
        lastCard: {id, value},
        locked: false
      });
    }
  }

  renderCards = () => {
    return this.props.data.map((card, i) => {
      const {slug, matched, flipped, id, images} = card;
      const shortTile = slug.substring(0, 10).replace(/[0-9]/g, '');
      return (
        <Card
          title={shortTile}
          value={slug}
          matched={matched}
          flipped={flipped}
          checkMatch={this.checkMatch}
          id={i}
          key={id}
          bgImage={images.original.url}
        />
      );
    });
  }

  reset = (e) => {
    e && e.preventDefault();
    this.props.resetMatch(true);
    this.setState({
      matchOver: false, 
      matches: 0
    });
  }

  render() {
    const isGameOver = (this.state.matches === this.props.data.length / 2) && this.props.data.length > 0;
    const buttonText = isGameOver ? 'play again' : 'reset';
    const buttonClass = `reset-btn ${isGameOver ? 'reset-btn--over' : 'reset-btn--on'}`;
    const listClass = `cards-list ${this.state.matchOver ? 'cards-list--over' : 'cards-list--on'}`;
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
