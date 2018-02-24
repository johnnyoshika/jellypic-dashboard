import { normalize } from 'normalizr'
import { user as userSchema } from '../store/schema'
import { addEntities } from './entities'
import { ROUTE_SESSION_STATE } from './actionTypes'

const changeState = (state) => {
  return {
    type    : ROUTE_SESSION_STATE,
    payload : {
      state,
      error: null,
      user: null
    }
  }
}

const setSession = (userId) => {
  return {
    type: ROUTE_SESSION_STATE,
    payload: {
      state: 'authenticated',
      user: userId
    }
  }
}

const authenticationFailed = (message) => {
  return {
    type: ROUTE_SESSION_STATE,
    payload: {
      state: 'error',
      error: message,
      user: null
    }
  }
}

const authenticate = () => {
  return (dispatch, getState) => {
    dispatch(changeState('checking'))

    return fetch('/api/sessions/me', {
      credentials: 'include'
    })
    .then(response => {
      if (response.headers.get('Content-Type').split(';')[0].toLowerCase().trim() !== 'application/json')
        throw new Error('Error connecting to the server. Please try again!')

      response.json().then(json => {
        if (response.ok) {
          const data = normalize(json, userSchema)
          dispatch(addEntities(data.entities))
          dispatch(setSession(data.result))
          return
        }

        if (response.status === 401)
          dispatch(changeState('anonymous'))
        else
          dispatch(authenticationFailed(json.message))
      })
    })
    .catch(error => dispatch(authenticationFailed(error.message)))
  }
}

export { authenticate }