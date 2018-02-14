import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));
if ('serviceWorker' in navigator) {
	navigator.serviceWorker
		.register('/sw.js')
		.then(registration => console.log('Service Worker registered.', registration))
		.catch(error => console.error('Error registering service worker: ', error))
}
