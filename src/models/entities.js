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
