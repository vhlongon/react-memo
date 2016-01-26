import React from 'react';
import Card from './Card';

export default class CardsList extends React.Component {
  render() {
    let cardsData = this.props.data.map(function loopData(cardData) {
      return (
      	<Card title={cardData.slug} key={cardData.id} bgImage={cardData.images.original.url} />
  		);
    });
    return (
  		<div className="cards-list">
    		{cardsData}
    	</div>
  	);
  }
}
