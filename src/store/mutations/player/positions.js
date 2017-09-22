import { head } from 'lodash'

const positions = [{
  id: 'auto',
  label: 'Insert Player automatically'
}, {
  id: 'beginning',
  label: 'Insert Player at Beginning'
}, {
  id: 'end',
  label: 'Insert Player at End'
}, {
  id: 'not',
  label: 'No automatic Insertion'
}]

const state = {
  position: head(positions).id,
  positions
}

const mutations = {
  setPosition (state, id) {
    state.player.position = id
  }
}

export default {
  state,
  mutations
}
