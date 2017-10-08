import { cloneDeep, extend } from 'lodash'

const features = [
  'current',
  'progress',
  'duration',
  'tracks',
  'fullscreen',
  'volume'
]

const params = {
  alwaysShowHours: true,
  alwaysShowControls: true,
  timecontrolsVisible: false,
  summaryVisible: false,
  hidetimebutton: false,
  hidedownloadbutton: false,
  hidesharebutton: false,
  sharewholeepisode: false,
  loop: false,
  chapterlinks: 'all',
  chaptersVisible: false,
  preload: false
}

const pluginPath = 'static/v2'

const mutations = {
  setChaptersVisible (state, visible) {
    state.chaptersVisible = visible
  },

  setConfig (state, config = {}) {
    extend(state, config)
  }
}

const state = cloneDeep({
  pluginPath,
  features,
  ...params
})

const getters = {
  config (state) {
    return state
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}

