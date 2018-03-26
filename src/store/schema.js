import { schema } from 'normalizr';

export const user = new schema.Entity('users');

export const profile = new schema.Entity('profiles');

export const like = new schema.Entity('likes', {
  user: user
});

export const comment = new schema.Entity('comments', {
  user: user
});

export const post = new schema.Entity('posts', {
  user: user,
  likes: [like],
  comments: [comment]
});
