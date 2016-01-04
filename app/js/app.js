import React from 'react';
import ReactDOM from 'react-dom';

export default class App extends React.Component {
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
	<App title="A react component"/>,
	document.querySelector('.react-root')
);
