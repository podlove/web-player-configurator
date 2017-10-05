import { mergeState } from '../../utils'
import { cloneDeep } from 'lodash'

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
    mergeState(state, config)
  }
}

const state = cloneDeep({
  pluginPath,
  features,
  ...params
})

export default {
  namespaced: true,
  state,
  mutations
}

