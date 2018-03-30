import { SERVICE_WORKER_STATE } from './actionTypes';

let isSetUp;

const setUp = () => {
  return (dispatch, getState) => {
    if (isSetUp) return;
    isSetUp = true;
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.ready.then(registration => {
        // The window client isn't currently controller so it's a new service worker that will activate immediately
        if (!navigator.serviceWorker.controller) return;

        let preventDevToolsReloadLoop;
        navigator.serviceWorker.addEventListener('controllerchange', e => {
          // New service worker's been activated.

          // Ensure refresh is only called once. Workaround for bug in dev tools "force update on reload".
          if (preventDevToolsReloadLoop) return;
          preventDevToolsReloadLoop = true;
          window.location.reload();
        });

        // SW is waiting to activate. Can occur if multiple clients open and
        // one of the clients is refreshed
        if (registration.waiting) return dispatch(changeState('stale'));

        const listenInstalledStateChange = () => {
          registration.installing.addEventListener('statechange', e => {
            if (e.target.state === 'installed') dispatch(changeState('stale'));
          });
        };

        if (registration.installing) return listenInstalledStateChange();

        // We are currently controlled so a new SW may be found...
        // Add a listener in case a new SW is found,
        registration.addEventListener(
          'updatefound',
          listenInstalledStateChange
        );
      });
    }
  };
};

const changeState = state => {
  return {
    type: SERVICE_WORKER_STATE,
    payload: {
      state
    }
  };
};

const skipWaiting = () => {
  return (dispatch, getState) => {
    navigator.serviceWorker.ready.then(registration => {
      // double checking to make sure registration.waiting is available
      if (!registration.waiting) return;

      dispatch(changeState('activating'));
      registration.waiting.postMessage('skipWaiting');
    });
  };
};

export { setUp, skipWaiting };
