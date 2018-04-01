import React from 'react';
import { render } from 'react-dom';
import { init } from '@rematch/core';
import * as  models from './models'
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import entities from './reducers/entities/';
import routes from './reducers/routes/';
import { reducer as toastr } from 'react-redux-toastr';
import './index.css';
import App from './App';

const store = init({
  models,
  redux: {
    reducers: {
      entities,
      routes,
      toastr
    },
    middlewares: [thunk]
  }
});

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    // Use the window load event to keep the page load performant
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/sw.js');
    });
  }
}
