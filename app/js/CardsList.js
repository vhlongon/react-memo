import React from 'react';
import Card from './Card';

export default class CardsList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      turns: 0,
      currentItem: '',
      change: false
    };
  }
  handleCardClick = (i) => {
    let itemSlug = this.props.data[i].slug,
      t = this.state.turns + 1;
    this.setState(
      {turns: t, change: t >= 2, currentItem: itemSlug}
    );
    if (itemSlug === this.state.currentItem) {
      console.log('the same item');
    }
  }
  componentDidUpdate  = () => {
    
  }

  render() {
    return (
      <div className="cards-list">
        {this.props.data.map((card, i) => {
          return (
            <Card onClick={() => this.handleCardClick(i)}
            title={card.slug}
            key={card.id}
            bgImage={card.images.original.url}
            />
          );
        })}
      </div>
    );
  }
}
