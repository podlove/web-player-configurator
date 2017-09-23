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
    state.player.v2.chaptersVisible = visible
  }
}

export default {
  state: {
    v2: cloneDeep({
      pluginPath,
      features,
      ...params
    })
  },
  mutations
}

