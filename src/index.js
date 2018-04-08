import React from 'react';
import { render } from 'react-dom';
import { init } from '@rematch/core';
import createRematchPersist from '@rematch/persist';
import { getPersistor } from '@rematch/persist';
import storage from 'redux-persist/lib/storage';
import { PersistGate } from 'redux-persist/es/integration/react';
import * as models from './models';
import { Provider } from 'react-redux';
import { reducer as toastr } from 'react-redux-toastr';
import './index.css';
import App from './App';

const persistPlugin = createRematchPersist({
  key: 'root',
  storage,
  whitelist: [
    'routeUserPosts',
    'routeUserProfile',
    'routePost',
    'routeHome',
    'session',
    'entities'
  ],
  throttle: 3000,
  version: 1,
  debug: process.env.NODE_ENV !== 'production'
});

const store = init({
  models,
  plugins: [persistPlugin],
  redux: {
    reducers: {
      toastr
    }
  }
});

const persistor = getPersistor();

render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <App />
    </PersistGate>
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
