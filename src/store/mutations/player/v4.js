const fallbackColor = '#2B8AC6'

const INITIAL_STATE = {
  v4: {
    theme: {
      main: fallbackColor,
      highlight: null
    },
    tabs: {
      info: false,
      chapters: true,
      share: false,
      download: false,
      audio: false
    },
    components: {
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
      }
    }
  }
}

const mutations = {
  setMainColor (state, color) {
    state.player.v4.theme.main = color || fallbackColor
  },

  setHighlightColor (state, color) {
    state.player.v4.theme.highlight = color === 'transparent' ? null : color
  },

  setAvailableTabs (state, {tab, visible}) {
    state.player.v4.components.tabs[tab] =
    visible ? INITIAL_STATE.v4.components.tabs[tab] : undefined
    console.log(tab, visible, state.player.v4.components.tabs[tab], INITIAL_STATE.v4.components.tabs)
  }
}

export default {
  state: Object.assign({}, INITIAL_STATE),
  mutations
}

