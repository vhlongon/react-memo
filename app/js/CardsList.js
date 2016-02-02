import React from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Card from './Card';


export default class CardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      cardsInPlay: [],
      cardsOutOfPlay: [],
      picks: [],

    };
  }
  handleCardClick = (i) => {
    let item = this.props.data[i],
      picks = this.state.picks,
      newPicks = picks.concat([item]);
      //t = this.state.turns + 1;

    // this.setState(
    //   {turns: t, change: t >= 2, currentItem: item.slug}
    // );
    // if (t >= 2) {
    //   this.setState({turns: -1});
    // }
    //
    // if (item.slug === this.state.currentItem) {
    //   this.setState({hit: true});
    // }else {
    //   this.setState({hit: false});
    // }

    this.setState({picks: newPicks});
  }

  componentWillReceiveProps  = () => {
    setTimeout(() => {
      this.setState({cardsInPlay: this.props.data});
    }, 300);
  }


  render() {
    let cards = this.props.data.map((card, i) => {
      return (
        <Card onClick={() => this.handleCardClick(i)}
          title={card.slug}
          hit={this.state.hit}
          flipBack={this.state.change}
          key={card.id}
          bgImage={card.images.original.url}
        />
      );
    });
    return (
      <div className="cards-list">
      <ReactCSSTransitionGroup transitionName="c-transition" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
        {cards}
      </ReactCSSTransitionGroup>
      </div>
    );
  }
}
