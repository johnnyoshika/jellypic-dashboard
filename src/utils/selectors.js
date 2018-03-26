import { denormalize } from 'normalizr';
import { user, profile, post } from '../store/schema';

const selectUser = (entities, id) => denormalize(id, user, entities);
const selectProfile = (entities, id) => denormalize(id, profile, entities);
const selectPost = (entities, id) => denormalize(id, post, entities);

export { selectUser, selectProfile, selectPost };
