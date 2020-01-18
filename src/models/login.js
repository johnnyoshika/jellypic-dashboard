import { dispatch } from '@rematch/core';
import request from 'utils/request';

const ensureFacebookSdkLoaded = callback => {
  if (window.fbAsyncInit) return callback();

  window.fbAsyncInit = () => {
    window.FB.init({
      appId: process.env.REACT_APP_FACEBOOK_APP_ID,
      cookie: false,
      xfbml: false,
      version: 'v2.8'
    });
    callback();
  };

  /*eslint-disable */
  (function(d, s, id) {
    var js,
      fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = '//connect.facebook.net/en_US/sdk.js';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'facebook-jssdk');
  /*eslint-enable */
};

const checkFacebookLoginStatus = response => {
  if (response.status === 'connected') {
    /*
    {
        status: 'connected',
        authResponse: {
            accessToken: '...',
            expiresIn:'...',
            signedRequest:'...',
            userID:'...'
        }
    }
    */
    login(response.authResponse.accessToken);
  } else {
    dispatch.login.changeStatus({ status: 'ready' });
  }
};

const login = (accessToken) => {
  dispatch.login.changeStatus({ status: 'processing' });

  return request('/api/sessions', {
    method: 'POST',
    credentials: 'include',
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify({
      accessToken: accessToken
    })
  }).then(
    response => dispatch.login.loginSucceeded(),
    error => dispatch.login.loginFailed({ message: error.message })
  );
};

export default {
  state: {
    status: 'idle', // idle,processing,ready,success,error
    error: null
  },
  reducers: {
    changeStatus: (state, { status }) => ({
      ...state,
      ...{ status: status, error: null }
    }),
    loginFailed: (state, { message }) => ({
      ...state,
      ...{ status: 'error', error: message }
    }),
    loginSucceeded: (state, payload) => ({
      ...state,
      ...{ status: 'success', error: null }
    })
  },
  effects: {
    async checkFacebook(payload, rootState) {
      this.changeStatus({ status: 'processing' });

      ensureFacebookSdkLoaded(() => {
        window.FB.getLoginStatus(response => {
          checkFacebookLoginStatus(response);
        });
      });
    },
    async loginWithFacebook(payload, rootState) {
      this.changeStatus({ status: 'processing' });
      window.FB.login(response => {
        checkFacebookLoginStatus(response);
      });
    }
  }
};
