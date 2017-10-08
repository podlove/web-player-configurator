/* global translations */

import { head, extend } from 'lodash'

const positions = [{
  id: 'auto',
  label: translations.position_auto
}, {
  id: 'beginning',
  label: translations.position_beginning
}, {
  id: 'end',
  label: translations.position_end
}, {
  id: 'not',
  label: translations.position_not
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
  players
}

const mutations = {
  setPosition (state, id) {
    state.activePosition = id
  },
  setPlayer (state, id) {
    state.activePlayer = id
  },
  setConfig (state, settings) {
    extend(state, settings)
  }
}

const getters = {
  config ({ activePosition, activePlayer }) {
    return {
      activePosition,
      activePlayer
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
