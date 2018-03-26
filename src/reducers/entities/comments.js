import { ENTITIES_ADD } from '../../actions/actionTypes';

const ACTION_HANDLERS = {
  [ENTITIES_ADD]: (state, action) => ({
    ...state,
    ...action.payload.comments
  })
};

const initialState = {};
export default function commentsReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type];

  return handler ? handler(state, action) : state;
}
