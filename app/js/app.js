import React from 'react';
import Card from './Card';
import loadAjax from './helpers/ajax';

import ReactDOM from 'react-dom';

export default class GameTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {data: ''};
  }
  loadData = () => {
    let baseUrl = 'http://api.giphy.com/v1/gifs/search?q',
      keyword = 'star+wars',
      apikey = 'dc6zaTOxFJmzC',
      limit = '2';
    loadAjax(`${baseUrl}=${keyword}&api_key=${apikey}&limit=${limit}`,
      (xhr) => {
        this.setState({data: xhr.responseText});
        console.log(JSON.parse(xhr.responseText));
      }
    );
  }
  componentDidMount() {
    this.loadData();
  }
  render = () => {
    return (
      <div className="gametable">
        <h2 className="gametale__title">
        {this.props.title}
        </h2>
        <div className="result">
        {this.state.data}
        </div>
        <Card title="A card"/>
      </div>
    );
  }
}

ReactDOM.render(
	<GameTable title="A react memory game"/>,
	document.querySelector('.react-root')
);
