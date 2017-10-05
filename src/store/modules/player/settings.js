import { head } from 'lodash'
import { mergeState } from '../../utils'

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

const players = [{
  id: 'v2',
  label: 'Podlove Player v2'
}, {
  id: 'v3',
  label: 'Podlove Player v3',
  deprecated: true
}, {
  id: 'v4',
  label: 'Podlove Player v4',
  version: '4.0.0-beta.1'
}, {
  id: 'podigee',
  label: 'Podigee Player'
}]

const activePlayer = head(players).id
const activePosition = head(positions).id

const state = {
  activePosition,
  positions,
  activePlayer,
  players,
}

const mutations = {
  setPosition (state, id) {
    state.activePosition = id
  },
  setPlayer (state, id) {
    state.activePlayer = id
  },
  setConfig (state, settings) {
    mergeState(state, settings)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
