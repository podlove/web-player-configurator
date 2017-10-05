import Vue from 'vue'

import settings from './settings'
import meta from './meta'

import v4 from './v4'
import v3 from './v3'
import v2 from './v2'

const actions = {
  boot ({ commit }) {
    Vue.http.get('http://localhost:3000/boot')
      .then(response => {
          const { settings, meta, v4, v3, v2 } = response.data;

          commit('settings/setConfig', settings)
          commit('meta/setMeta', meta)
          commit('v4/setConfig', v4)
          commit('v3/setConfig', v3)
          commit('v2/setConfig', v2)
      });
  }
}

export default {
  namespaced: true,
  actions,
  modules: {
    meta,
    settings,
    v4,
    v3,
    v2
  }
}
