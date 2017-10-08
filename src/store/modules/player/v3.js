import { cloneDeep, head, extend } from 'lodash'

const themes = [{
  name: 'PWP Blue Orange',
  id: 'pwp-blue-orange'
}, {
  name: 'PWP Creamy',
  id: 'pwp-creamy'
}, {
  name: 'PWP Dark Blaze',
  id: 'pwp-dark-blaze'
}, {
  name: 'PWP Dark Gray',
  id: 'pwp-dark-gray'
}, {
  name: 'PWP Dark Green',
  id: 'pwp-dark-green'
}, {
  name: 'PWP Dark',
  id: 'pwp-dark'
}, {
  name: 'PWP Jungle Green',
  id: 'pwp-jungle-green'
}, {
  name: 'PWP Light Grey',
  id: 'pwp-light-grey'
}, {
  name: 'PWP Light',
  id: 'pwp-light'
}, {
  name: 'PWP Midnightblue',
  id: 'pwp-midnightblue'
}, {
  name: 'PWP Silver Blaze',
  id: 'pwp-silver-blaze'
}, {
  name: 'PWP Silver',
  id: 'pwp-silver'
}]

const activeTheme = head(themes).id

const params = {
  alwaysShowHours: true,
  timecontrolsVisible: true,
  summaryVisible: true,
  sharebuttonsVisible: true,
  activeTab: null
}

const mutations = {
  setTheme (state, id) {
    state.activeTheme = id
  },

  setChaptersVisible (state, active) {
    state.params.activeTab = active ? 'chapters' : null
  },

  setConfig (state, config = {}) {
    extend(state, config)
  }
}

const state = cloneDeep({
  activeTheme,
  themes,
  params
})

const getters = {
  config ({ activeTheme }) {
    return {
      activeTheme,
      params
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}

