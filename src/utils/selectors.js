import { denormalize } from 'normalizr';
import { post } from '../store/schema';

const selectPost = (entities, id) => denormalize(id, post, entities);

export { selectPost };
