<template>
  <div class="player-config v4">
    <el-row class="preview">
      <el-col :span="18">
        <preview @ready="onReady" :config="playerConfig"></preview>
      </el-col>
    </el-row>
    <div class="config" v-if="playerReady">
      <el-row :gutter="30">
        <el-col :span="12">
          <h4>Theme</h4>
          <el-form label-position="top" label-width="100px">
            <el-form-item label="Main">
              <el-input v-model="theme.main" @input="setMainThemeColor">
                <el-color-picker class="borderless" slot="append" v-model="theme.main" @active-change="previewMainThemeColor" @change="setMainThemeColor"></el-color-picker>
              </el-input>
            </el-form-item>
            <el-form-item label="Highlight">
              <el-input class="inline-input" v-model="theme.highlight" @input="setMainThemeColor">
                <el-color-picker slot="append" class="borderless" v-model="theme.highlight" @change="setHighlightThemeColor" @active-change="previewHighlightThemeColor"></el-color-picker>
              </el-input>
            </el-form-item>
          </el-form>
        </el-col>
        <el-col :span="12">
          <h4>Tabs</h4>
          <el-form label-position="top" label-width="100px">
            <el-form-item label="Available">
                <el-checkbox @input="setInfoTab" :checked="availableTabs.info" label="info">Info</el-checkbox>
                <el-checkbox @input="setChaptersTab" :checked="components.tabs.chapters.visible" label="chapters">Chapters</el-checkbox>
                <el-checkbox @input="setShareTab" :checked="components.tabs.share.visible" label="share">Share</el-checkbox>
                <el-checkbox @input="setDownloadTab" :checked="components.tabs.download.visible" label="download">Download</el-checkbox>
                <el-checkbox @input="setAudioTab" :checked="components.tabs.audio.visible" label="audio">Audio</el-checkbox>
            </el-form-item>

            <el-form-item label="Default Active">
              <!-- <el-select v-model="value" placeholder="Select">
                <el-option value="info" label="Info"></el-option>
                <el-option value="chapters" label="Chapters"></el-option>
                <el-option value="share" label="Share"></el-option>
                <el-option value="download" label="Download"></el-option>
                <el-option value="audio" label="Audio"></el-option>
              </el-select> -->
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { get } from 'lodash'
import Preview from './Preview.vue'

import '@/../static/v4/embed.js';

export default {
  data () {
    return {
      playerReady: false
    }
  },
  computed: {
    theme () {
      return this.$store.state.player.v4.theme
    },
    tabs () {
      return this.$store.state.player.v4.tabs
    },
    components () {
      return this.$store.state.player.v4.components
    },
    availableTabs () {
      return {
        info: get(this.components, 'tabs.info.visible', false)
      }
    },
    playerConfig () {
      const meta = this.$store.state.player.meta

      return {
        ...meta.episode,
        theme: this.theme,
        show: meta.show,
        audio: meta.files,
        chapters: meta.chapters,
        contributors: meta.contributors,
        components: this.components,
        reference: {
          base: '/static/v4'
        },
        tabs: this.tabs
      }
    }
  },
  methods: {
    previewMainThemeColor(color) {
      this.setTheme({...this.theme, main: color})
    },
    previewHighlightThemeColor(color) {
      this.setTheme({...this.theme, highlight: color})
    },
    setMainThemeColor (color) {
      this.$store.commit('setMainColor', color)
      this.setTheme(this.theme)
    },
    setHighlightThemeColor (color) {
      this.$store.commit('setHighlightColor', color)
      this.setTheme(this.theme)
    },
    setInfoTab (visible) {
      this.$store.commit('setAvailableTabs', {tab: 'info', visible})
      this.initPlayer(this.playerConfig)
    },
    setChaptersTab (visible) {
      this.$store.commit('setAvailableTabs', {tab: 'chapters', visible})
      this.initPlayer(this.playerConfig)
    },
    setShareTab (visible) {
      this.$store.commit('setAvailableTabs', {tab: 'chapters', visible})
      this.initPlayer(this.playerConfig)
    },
    setDownloadTab (visible) {
      this.$store.commit('setAvailableTabs', {tab: 'download', visible})
      this.initPlayer(this.playerConfig)
    },
    setAudioTab (visible) {
      this.$store.commit('setAvailableTabs', {tab: 'audio', visible})
      this.initPlayer(this.playerConfig)
    },
    onReady(store) {
      this.playerReady = true

      this.setTheme = theme => store.dispatch({
        type: 'SET_THEME',
        payload: theme
      })

      this.initPlayer = config => store.dispatch({
        type: 'INIT',
        payload: config
      })
    }
  },
  components: {
    Preview
  }
}
</script>


<style lang="scss">
  @import '../../../styles/variables';

  .preview {
    margin-bottom: $spacing * 2;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .borderless {
    height: 22px;
    padding-top: 4px;

    .el-color-picker__trigger {
      border: none;
      height: 100%;
      padding: 0;
    }
  }
</style>
