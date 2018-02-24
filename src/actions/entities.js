import { ENTITIES_ADD } from './actionTypes'

const addEntities = (entities) => ({
  type: ENTITIES_ADD,
  payload: entities
})

export { addEntities }