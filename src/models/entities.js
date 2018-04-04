import { dispatch } from '@rematch/core';
import { normalize } from 'normalizr';
import {
  post as postSchema,
  user as userSchema,
  profile as profileSchema
} from '../store/schema';

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.addEventListener('message', async e => {
    if (e.data.type !== 'api-updates') return;

    const { url, cacheName } = e.data;

    const match = /https*:\/\/[^/]+\/api\/([^/]+)/gi.exec(url);
    if (!match) return;

    switch (match[1]) {
      case 'sessions':
      case 'users':
        return await refresh(url, cacheName, userSchema);
      case 'posts':
        return await refresh(url, cacheName, postSchema);
      case 'profiles':
        return await refresh(url, cacheName, profileSchema);
      default:
        return;
      }
  });
}

const refresh = async (url, cacheName, schema) => {
  const cache = await caches.open(cacheName);
  const response = await cache.match(url);
  const json = await response.json();

  let data;
  if (json.data && Array.isArray(json.data))
    data = normalize(json.data, [schema]);
  else
    data = normalize(json, schema);

  dispatch.entities.add(data.entities);
};

const merge = (state, payload) => {
  const entityNames = {};
  for (const key in state) entityNames[key] = 1;
  for (const key in payload) entityNames[key] = 1;

  const result = {};
  for (const name in entityNames) {
    const initial = state[name] || {};
    const append = payload[name] || {};

    result[name] = { ...initial, ...append };
  }

  return result;
};

export default {
  state: {},
  reducers: {
    add: (state, payload) => merge(state, payload)
  }
};
