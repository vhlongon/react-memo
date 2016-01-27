import React from 'react';
import Card from './Card';

export default class CardsList extends React.Component {

  handleCardClick = (i) => {
    let itemClick = this.props.data[i].slug;
    console.log(`the item ${itemClick} has been clicked`);
  }

  render() {
    return (
      <div className="cards-list">
        {this.props.data.map(function loopData(card, i) {
          return (
            <Card onClick={i => this.handleCardClick(i)}
            title={card.slug}
            key={card.id}
            bgImage={card.images.original.url}
            />
          );
        }, this)}
      </div>
    );
  }
}
