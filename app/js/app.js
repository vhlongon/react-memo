import React from 'react';
import Card from './Card';
import ReactDOM from 'react-dom';

export default class GameTable extends React.Component {
  render() {
    return (
      <div className="gametable">
        <h2 className="gametale__title">
        {this.props.title}
        </h2>
        <Card title="A card"/>
      </div>
    );
  }
}

ReactDOM.render(
	<GameTable title="A react memory game"/>,
	document.querySelector('.react-root')
);
