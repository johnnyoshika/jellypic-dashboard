import { normalize } from 'normalizr';
import { post as postSchema } from '../store/schema';
import {
  ENTITIES_ADD,
  POSTS_PREPEND,
  POSTS_APPEND,
  POSTS_REPLACE,
  USER_POSTS_PREPEND,
  USER_POSTS_APPEND,
  USER_POSTS_REPLACE
} from './actionTypes';

const addEntities = entities => ({
  type: ENTITIES_ADD,
  payload: entities
});

const prependPostsAction = posts => ({
  type: POSTS_PREPEND,
  payload: posts
});

const appendPostsAction = posts => ({
  type: POSTS_APPEND,
  payload: posts
});

const replacePostsAction = posts => ({
  type: POSTS_REPLACE,
  payload: posts
});

const prependPosts = posts => {
  return (dispatch, getState) => {
    dispatch(addEntities(normalize(posts, [postSchema]).entities));
    dispatch(prependPostsAction(posts));
  };
};

const appendPosts = posts => {
  return (dispatch, getState) => {
    dispatch(addEntities(normalize(posts, [postSchema]).entities));
    dispatch(appendPostsAction(posts));
  };
};

const replacePosts = posts => {
  return (dispatch, getState) => {
    dispatch(addEntities(normalize(posts, [postSchema]).entities));
    dispatch(replacePostsAction(posts));
  };
};

const prependUserPostsAction = posts => ({
  type: USER_POSTS_PREPEND,
  payload: posts
});

const appendUserPostsAction = posts => ({
  type: USER_POSTS_APPEND,
  payload: posts
});

const replaceUserPostsAction = posts => ({
  type: USER_POSTS_REPLACE,
  payload: posts
});

const prependUserPosts = posts => {
  return (dispatch, getState) => {
    dispatch(addEntities(normalize(posts, [postSchema]).entities));
    dispatch(prependUserPostsAction(posts));
  };
};

const appendUserPosts = posts => {
  return (dispatch, getState) => {
    dispatch(addEntities(normalize(posts, [postSchema]).entities));
    dispatch(appendUserPostsAction(posts));
  };
};

const replaceUserPosts = posts => {
  return (dispatch, getState) => {
    dispatch(addEntities(normalize(posts, [postSchema]).entities));
    dispatch(replaceUserPostsAction(posts));
  };
};

export { addEntities, prependPosts, appendPosts, replacePosts, prependUserPosts, appendUserPosts, replaceUserPosts };
