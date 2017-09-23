import { reduce, cloneDeep } from 'lodash'

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

const components = {
  header: {
    info: false,
    error: false
  },
  progressbar: {
    visible: true
  },
  tabs: {
    chapters: {
      visible: true
    },
    share: {
      visible: true
    },
    audio: {
      visible: true,
      volume: false,
      rate: false
    },
    download: {
      visible: true
    },
    info: {
      visible: true
    }
  },
  controls: {
    steppers: true,
    chapters: true
  }
}

const mutations = {
  setMainColor (state, color) {
    state.player.v4.theme.main = color || fallbackColor
  },

  setHighlightColor (state, color) {
    state.player.v4.theme.highlight = color
  },

  setAvailableTabs (state, {tab, visible}) {
    state.player.v4.components.tabs[tab] = visible ? components.tabs[tab] : undefined
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
      components
    })
  },
  mutations
}

