import { ADD_ENTITIES } from './actionTypes'

const addEntities = (entities) => ({
  type: ADD_ENTITIES,
  payload: entities
})

export { addEntities }