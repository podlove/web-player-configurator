<template>
  <div class="player-config v4">
    <el-row class="preview">
      <el-col :span="24">
        <preview @ready="onReady" :config="playerConfig"></preview>
      </el-col>
    </el-row>
    <div class="config" v-if="playerReady">
      <el-row :gutter="30">
        <el-col :xs="24" :md="12">
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
        <el-col :xs="24" :md="12">
          <h4>Tabs</h4>
          <el-form label-position="top" label-width="100px">
            <el-form-item label="Available">
                <el-checkbox @input="setInfoTab" :checked="availableTabs.info" label="info">Info</el-checkbox>
                <el-checkbox @input="setChaptersTab" :checked="availableTabs.chapters" label="chapters">Chapters</el-checkbox>
                <el-checkbox @input="setShareTab" :checked="availableTabs.share" label="share">Share</el-checkbox>
                <el-checkbox @input="setDownloadTab" :checked="availableTabs.download" label="download">Download</el-checkbox>
                <el-checkbox @input="setAudioTab" :checked="availableTabs.audio" label="audio">Audio</el-checkbox>
            </el-form-item>

            <el-form-item label="Default Active">
              <el-select clearable @input="setActiveTab" :value="activeTab" placeholder="Select" :disabled="
                !availableTabs.info &&
                !availableTabs.chapters &&
                !availableTabs.share &&
                !availableTabs.download &&
                !availableTabs.audio
              ">
                <el-option value="info" label="Info" v-if="availableTabs.info"></el-option>
                <el-option value="chapters" label="Chapters" v-if="availableTabs.chapters"></el-option>
                <el-option value="share" label="Share" v-if="availableTabs.share"></el-option>
                <el-option value="download" label="Download" v-if="availableTabs.download"></el-option>
                <el-option value="audio" label="Audio" v-if="availableTabs.audio"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :xs="24" :md="12">
          <h4>Components</h4>
           <el-form label-position="top" label-width="100px">
            <el-form-item>
              <el-checkbox class="block-checkbox" @input="setHeader" :checked="header" label="chapters">Header</el-checkbox>
              <el-checkbox class="block-checkbox" @input="setProgressBar" :checked="progressbar" label="chapters">Progress</el-checkbox>
            </el-form-item>
           </el-form>
        </el-col>
        <el-col :xs="24" :md="12">
          <h4>Controls</h4>
            <el-form label-position="top" label-width="100px">
            <el-form-item>
              <el-checkbox class="block-checkbox" @input="setStepperControls" :checked="controls.steppers" label="steppers">Steppers</el-checkbox>
              <el-checkbox class="block-checkbox" @input="setChaptersControls" :checked="controls.chapters" label="chapters">Chapters</el-checkbox>
            </el-form-item>
           </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { get, head } from 'lodash'
import Preview from './Preview.vue'

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
        info: get(this.components, 'tabs.info.visible', false),
        chapters: get(this.components, 'tabs.chapters.visible', false),
        share: get(this.components, 'tabs.share.visible', false),
        download: get(this.components, 'tabs.download.visible', false),
        audio: get(this.components, 'tabs.audio.visible', false)
      }
    },
    controls () {
      return {
        chapters: get(this.components, 'controls.chapters', false),
        steppers: get(this.components, 'controls.steppers', false)
      }
    },
    activeTab () {
      const activeTab = Object.keys(this.tabs).filter(tab => this.tabs[tab])
      return head(activeTab)
    },
    header () {
      const active = get(this.components, 'header', false)
      return !!active
    },
    progressbar () {
      return get(this.components, 'progressbar.visible', false)
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
      color = color === 'transparent' ? null : color
      this.setTheme({...this.theme, highlight: color})
    },
    setMainThemeColor (color) {
      this.$store.commit('setMainColor', color)
      this.initPlayer(this.playerConfig)
    },
    setHighlightThemeColor (color) {
      this.$store.commit('setHighlightColor', color)
      this.initPlayer(this.playerConfig)
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
      this.$store.commit('setAvailableTabs', {tab: 'share', visible})
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
    setActiveTab (tab) {
      this.$store.commit('setActiveTab', tab)
      this.initPlayer(this.playerConfig)
    },
    setHeader (active) {
      this.$store.commit('setHeaderComponent', active)
      this.initPlayer(this.playerConfig)
    },
    setProgressBar (active) {
      this.$store.commit('setProgressBarComponent', active)
      this.initPlayer(this.playerConfig)
    },
    setStepperControls (active) {
      this.$store.commit('setSteppersComponent', active)
      this.initPlayer(this.playerConfig)
    },
    setChaptersControls (active) {
      this.$store.commit('setChaptersComponent', active)
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
