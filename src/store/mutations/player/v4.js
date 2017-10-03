import { reduce, cloneDeep, capitalize } from 'lodash'

const fallbackColor = '#2B8AC6'

const theme = {
  main: fallbackColor,
  highlight: null
}

const tabs = {
  info: false,
  chapters: false,
  share: false,
  download: false,
  audio: false
}

const visibleComponents = [
  'tabInfo',
  'tabChapters',
  'tabDownload',
  'tabAudio',
  'tabShare',
  'poster',
  'showTitle',
  'episodeTitle',
  'subtitle',
  'progressbar',
  'controlSteppers',
  'controlChapters'
]

const mutations = {
  setMainColor (state, color) {
    state.player.v4.theme.main = color || fallbackColor
  },

  setHighlightColor (state, color) {
    state.player.v4.theme.highlight = color
  },

  setComponent (state, { component, visible }) {
    if (visible) {
      state.player.v4.visibleComponents = [
        ...state.player.v4.visibleComponents,
        component
      ]
    } else {
      state.player.v4.visibleComponents =
        state.player.v4.visibleComponents.filter(item => item !== component)
    }
  },

  setActiveTab (state, tab) {
    state.player.v4.tabs = reduce(tabs, (result, active, name) => ({
      ...result,
      [name]: name === tab
    }), {})
  },

  setHeaderComponent (state, active) {
    state.player.v4.components.header = active ? components.header : {
      info: undefined,
      error: undefined
    }
  },

  setProgressBarComponent (state, active) {
    state.player.v4.components.progressbar.visible = active ? true : undefined
  },

  setSteppersComponent (state, active) {
    state.player.v4.components.controls.steppers = active ? true : undefined
  },

  setChaptersComponent (state, active) {
    state.player.v4.components.controls.chapters = active ? true : undefined
  }
}

export default {
  state: {
    v4: cloneDeep({
      theme,
      tabs,
      visibleComponents
    })
  },
  mutations
}

