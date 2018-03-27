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

const setError = message => {
  return {
    type: SUBSCRIBER_STATE,
    payload: {
      state: 'error',
      error: message
    }
  };
};

const check = () => {
  return (dispatch, getState) => {
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
      dispatch(changeState('unavailable'));
      return;
    }

    if (!navigator.serviceWorker.controller) {
      dispatch(setError(`Service worker is not controlling this app.`));
      return;
    }

    navigator.serviceWorker.ready
      .then(registration => registration.pushManager.getSubscription())
      .then(subscription => {
        if (subscription) dispatch(changeState('subscribed'));
        else dispatch(changeState('available'));
      })
      .catch(error =>
        dispatch(
          setError(
            `Couldn't detect whether push notification is available on this device.`
          )
        )
      );
  };
};

const subscribe = () => {
  return (dispatch, getState) => {
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager
        .subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(
            process.env.REACT_APP_WEB_PUSH_VAPID_PUBLIC_KEY
          )
        })
        .then(s =>
          save(dispatch, getState, '/api/subscriptions', {
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            credentials: 'include',
            body: JSON.stringify(s)
          })
        );
    });
  };
};

const unsubscribe = () => {
  return (dispatch, getState) => {
    navigator.serviceWorker.ready.then(registration => {
      registration.pushManager.getSubscription().then(subscription => {
        subscription.unsubscribe().then(() => {
          save(
            dispatch,
            getState,
            `/api/subscriptions?endpoint=${encodeURIComponent(
              subscription.endpoint
            )}`,
            {
              method: 'DELETE',
              credentials: 'include'
            }
          );
        });
      });
    });
  };
};

const save = (dispatch, getState, url, options) => {
  dispatch(changeState('saving'));
  return request(url, options).then(
    response => check()(dispatch, getState),
    error => dispatch(setError(error.message))
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

export { check, subscribe, unsubscribe };
