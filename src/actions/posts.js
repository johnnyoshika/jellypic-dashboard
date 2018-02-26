import { denormalize } from 'normalizr';
import { post } from '../store/schema';

const selectPost = (state, id) => denormalize(id, post, state);

export { selectPost };
