import { cloneDeep, head } from 'lodash'

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
    state.player.v3.activeTheme = id
  },

  setActiveChapters (state, tab) {
    state.player.v3.params.activeTab = tab
  }
}

export default {
  state: {
    v3: {
      activeTheme,
      themes,
      params
    }
  },
  mutations
}

