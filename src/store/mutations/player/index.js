import players from './players'
import positions from './positions'
import meta from './meta'

import v4 from './v4'
import v2 from './v2'

const state = {
  player: {
    ...players.state,
    ...positions.state,
    ...v4.state,
    ...v2.state,
    meta: meta.state
  }
}

const mutations = {
  ...players.mutations,
  ...positions.mutations,
  ...v4.mutations,
  ...v2.mutations
}

export default {
  state,
  mutations
}
