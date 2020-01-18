import { dispatch } from '@rematch/core';
import request from 'utils/request';

const save = (url, options) => {
  dispatch.subscriber.changeStatus({ status: 'saving' });
  return request(url, options).then(
    response => dispatch.subscriber.check(),
    error => dispatch.subscriber.setError({ message: error.message })
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

export default {
  state: {
    status: 'idle', // idle,checking,unavailable,available,subscribed,saving,error
    error: null
  },
  reducers: {
    changeStatus: (state, { status }) => ({
      ...state,
      ...{ status: status, error: null }
    }),
    setError: (state, { message }) => ({
      ...state,
      ...{ status: 'error', error: message }
    })
  },
  effects: {
    async check() {
      this.changeStatus({ status: 'checking' });

      if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        this.changeStatus({ status: 'unavailable' });
        return;
      }

      if (!navigator.serviceWorker.controller) {
        this.setError({
          message: 'Service worker is not controlling this app.'
        });
        return;
      }

      if (Notification.permission === 'denied') {
        this.setError({
          message:
            'Oh oh! You blocked notifications. Please change your browser settings to enable it.'
        });
        return;
      }

      try {
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();

        if (!subscription) return this.changeStatus({ status: 'available' });

        try {
          await request(
            '/api/subscriptions?endpoint=' +
              encodeURIComponent(subscription.endpoint),
            {
              credentials: 'include'
            }
          );
          this.changeStatus({ status: 'subscribed' });
        } catch (error) {
          this.changeStatus({ status: 'available' });
        }
      } catch (error) {
        this.setError({
          message: `Couldn't detect whether push notification is available on this device.`
        });
      }
    },
    async subscribe() {
      const registration = await navigator.serviceWorker.ready;

      try {
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlB64ToUint8Array(
            process.env.REACT_APP_WEB_PUSH_VAPID_PUBLIC_KEY
          )
        });

        await save('/api/subscriptions', {
          headers: { 'Content-Type': 'application/json' },
          method: 'POST',
          credentials: 'include',
          body: JSON.stringify(subscription)
        });
      } catch (error) {
        this.setError({ message: error.message });
      }
    },
    async unsubscribe() {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();

      await subscription.unsubscribe();

      await save(
        `/api/subscriptions?endpoint=${encodeURIComponent(
          subscription.endpoint
        )}`,
        {
          method: 'DELETE',
          credentials: 'include'
        }
      );
    }
  }
};
