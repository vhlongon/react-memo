import React from 'react';
import ReactDOM from 'react-dom';

export default class GameTable extends React.Component {
  render() {
    return (
      <div className="app">
        <h2 className="app__title">
        {this.props.title}
        </h2>
      </div>
    );
  }
}

ReactDOM.render(
	<GameTable title="A react memory game"/>,
	document.querySelector('.react-root')
);
