
/* global translations */

import Vue from 'vue'
import { Loading, Notification } from 'element-ui'
import { get } from 'lodash'

import settings from './settings'
import meta from './meta'

import v4 from './v4'
import v3 from './v3'
import v2 from './v2'

const actions = {
  boot ({ commit }) {
    const initializing = Loading.service({ fullscreen: true, text: translations.message_initializing })

    Vue.http.get(`${process.env.API_ENDPOINT}/player/config`)
      .then(response => {
        const { settings, meta, v4, v3, v2 } = response.data

        commit('settings/setConfig', settings)
        commit('meta/setMeta', meta)
        commit('v4/setConfig', v4)
        commit('v3/setConfig', v3)
        commit('v2/setConfig', v2)
      })
      .catch(err => {
        Notification.error({
          title: translations.error_load_config,
          message: err.bodyText
        })
      })
      .finally(() => initializing.close())
  },

  save ({ getters }) {
    const saving = Loading.service({ fullscreen: true, text: translations.message_saving })
    const settings = get(getters, 'settings/config')
    const v2 = get(getters, 'v2/config')
    const v3 = get(getters, 'v3/config')
    const v4 = get(getters, 'v4/config')

    Vue.http.post(`${process.env.API_ENDPOINT}/player/config`, {
      settings, v2, v3, v4
    })
    .catch(err => {
      Notification.error({
        title: translations.error_save_config,
        message: err.bodyText
      })
    })
    .finally(() => saving.close())
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
