import { reduce, cloneDeep, capitalize, merge } from 'lodash'

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
    state.theme.main = color || fallbackColor
  },

  setHighlightColor (state, color) {
    state.theme.highlight = color
  },

  setComponent (state, { component, visible }) {
    if (visible && !state.visibleComponents.includes(component)) {
      state.visibleComponents = [
        ...state.visibleComponents,
        component
      ]
    }

    if (!visible && state.visibleComponents.includes(component)) {
      state.visibleComponents =
        state.visibleComponents.filter(item => item !== component)
    }
  },

  setActiveTab (state, tab) {
    state.tabs = reduce(tabs, (result, active, name) => ({
      ...result,
      [name]: name === tab
    }), {})
  },

  setHeaderComponent (state, active) {
    state.components.header = active ? components.header : {
      info: undefined,
      error: undefined
    }
  },

  setProgressBarComponent (state, active) {
    state.components.progressbar.visible = active ? true : undefined
  },

  setSteppersComponent (state, active) {
    state.components.controls.steppers = active ? true : undefined
  },

  setChaptersComponent (state, active) {
    state.components.controls.chapters = active ? true : undefined
  },

  setConfig (state, config = {}) {
    merge(state, config)
  }
}

const state = cloneDeep({
  theme,
  tabs,
  visibleComponents
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

