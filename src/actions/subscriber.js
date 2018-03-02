import request from '../utils/request';
import { SUBSCRIBER_STATE } from './actionTypes';

const changeState = state => {
  return {
    type: SUBSCRIBER_STATE,
    payload: {
      state: state,
      error: null
    }
  };
};

const saveFailed = message => {
  return {
    type: SUBSCRIBER_STATE,
    payload: {
      state: 'error',
      error: message
    }
  };
};

const saveSucceeded = () => {
  return {
    type: SUBSCRIBER_STATE,
    payload: {
      state: 'idle',
      error: null
    }
  };
};

const toggle = () => {
  return (dispatch, getState) => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) return;

    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.getSubscription().then(s => {
        if (s === null) subscribe(dispatch, registration);
        else unsubscribe(dispatch, s);
      });
    });
  };
};

const subscribe = (dispatch, registration) => {
  registration.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlB64ToUint8Array(
        process.env.REACT_APP_WEB_PUSH_VAPID_PUBLIC_KEY
      )
    })
    .then(s =>
      save(dispatch, '/api/subscriptions', {
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify(s)
      })
    );
};

const unsubscribe = (dispatch, subscription) => {
  subscription
    .unsubscribe()
    .then(() =>
      save(
        dispatch,
        `/api/subscriptions?endpoint=${encodeURIComponent(
          subscription.endpoint
        )}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      )
    );
};

const save = (dispatch, url, options) => {
  dispatch(changeState('saving'));
  return request(url, options).then(
    response => dispatch(saveSucceeded()),
    error => dispatch(saveFailed(error.message))
  );
};

// source: https://github.com/GoogleChromeLabs/web-push-codelab/blob/master/app/scripts/main.js
/*eslint-disable */
const urlB64ToUint8Array = base64String => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/');

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};
/*eslint-enable */

export { toggle };
