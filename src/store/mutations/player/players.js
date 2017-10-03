import { head } from 'lodash'

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

const state = {
  active: 'v3',
  players
}

const mutations = {
  setPlayer (state, id) {
    state.player.active = id
  }
}

export default {
  state,
  mutations
}
