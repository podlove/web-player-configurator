import { head } from 'lodash'

const players = [{
  id: 'v2',
  label: 'Podlove Player v2'
}, {
  id: 'v4',
  label: 'Podlove Player v4',
  version: '4.0.0-beta.1'
}, {
  id: 'v3',
  label: 'Podlove Player v3',
  deprecated: true
}, {
  id: 'podigee',
  label: 'Podigee Player'
}]

const state = {
  active: head(players).id,
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
