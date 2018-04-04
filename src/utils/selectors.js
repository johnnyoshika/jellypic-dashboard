import { denormalize } from 'normalizr';
import { user, profile, post } from '../store/schema';

const selectUser = (entities, id) => entities[user.key] ? denormalize(id, user, entities) : null;
const selectProfile = (entities, id) => entities[profile.key] ? denormalize(id, profile, entities) : null;
const selectPost = (entities, id) => entities[post.key] ? denormalize(id, post, entities) : null;

export { selectUser, selectProfile, selectPost };
