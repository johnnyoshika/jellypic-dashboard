let isSetUp;

export default {
  state: {
    status: 'fresh' // fresh,stale,activating
  },
  reducers: {
    changeStatus: (state, { status }) => ({
      ...state,
      ...{ status: status }
    })
  },
  effects: {
    async setUp(payload, rootState) {
      if (isSetUp) return (isSetUp = true);

      if (!('serviceWorker' in navigator)) return;

      const registration = await navigator.serviceWorker.ready;

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
      if (registration.waiting) return this.changeStatus({ status: 'stale' });

      const listenInstalledStateChange = () => {
        registration.installing.addEventListener('statechange', e => {
          if (e.target.state === 'installed')
            this.changeStatus({ status: 'stale' });
        });
      };

      if (registration.installing) return listenInstalledStateChange();

      // We are currently controlled so a new SW may be found...
      // Add a listener in case a new SW is found,
      registration.addEventListener('updatefound', listenInstalledStateChange);
    },
    async skipWaiting(payload, rootState) {
      const registration = await navigator.serviceWorker.ready;

      // double checking to make sure registration.waiting is available
      if (!registration.waiting) return;

      this.changeStatus({ status: 'activating' });
      registration.waiting.postMessage('skipWaiting');
    }
  }
};
