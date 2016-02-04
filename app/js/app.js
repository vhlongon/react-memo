// Import modules using ES2015
import React from 'react';
import ReactDOM from 'react-dom';
import CardsTable from './CardsTable';

window.React = require('React');

ReactDOM.render(
	<CardsTable title='A React memory game'/>,
	document.querySelector('.react-root')
);
