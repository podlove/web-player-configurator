import settings from './settings'
import meta from './meta'

import v4 from './v4'
import v3 from './v3'
import v2 from './v2'

export default {
  namespaced: true,
  modules: {
    meta,
    settings,
    v4,
    v3,
    v2
  }
}
