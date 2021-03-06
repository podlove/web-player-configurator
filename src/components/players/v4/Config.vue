<template>
  <div class="player-config v4">
    <div class="config" v-if="playerReady">
      <el-row :gutter="30">
        <el-col :xs="24" :md="12">
          <h4>{{ translations.theme }}</h4>
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
                <el-checkbox @input="visible => setComponent('tabInfo', visible)" :checked="isVisible('tabInfo')" label="info">{{ translations.tab_info }}</el-checkbox>
                <el-checkbox @input="visible => setComponent('tabChapters', visible)" :checked="isVisible('tabChapters')" label="chapters">{{ translations.tab_chapters }}</el-checkbox>
                <el-checkbox @input="visible => setComponent('tabShare', visible)" :checked="isVisible('tabShare')" label="share">{{ translations.tab_share }}</el-checkbox>
                <el-checkbox @input="visible => setComponent('tabDownload', visible)" :checked="isVisible('tabDownload')" label="download">{{ translations.tab_download }}</el-checkbox>
                <el-checkbox @input="visible => setComponent('tabAudio', visible)" :checked="isVisible('tabAudio')" label="audio">{{ translations.tab_audio }}</el-checkbox>
            </el-form-item>

            <el-form-item label="Default Active">
              <el-select clearable @input="setActiveTab" :value="activeTab" :placeholder="translations.select" :disabled="
                !isVisible('tabInfo') &&
                !isVisible('tabChapters') &&
                !isVisible('tabShare') &&
                !isVisible('tabDownload') &&
                !isVisible('tabAudio')
              ">
                <el-option value="info" :label="translations.tab_info" v-if="isVisible('tabInfo')"></el-option>
                <el-option value="chapters" :label="translations.tab_chapters" v-if="isVisible('tabChapters')"></el-option>
                <el-option value="share" :label="translations.tab_share" v-if="isVisible('tabShare')"></el-option>
                <el-option value="download" :label="translations.tab_download" v-if="isVisible('tabDownload')"></el-option>
                <el-option value="audio" :label="translations.tab_audio" v-if="isVisible('tabAudio')"></el-option>
              </el-select>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>

      <el-row :gutter="30">
        <el-col :xs="24" :md="12">

          <h4>{{ translations.components }}</h4>
           <el-form label-position="top" label-width="100px">
            <el-form-item>
              <el-checkbox class="block-checkbox" @input="visible => setComponent('poster', visible)" :checked="isVisible('poster')" label="chapters">{{ translations.components_poster }}</el-checkbox>
              <el-checkbox class="block-checkbox" @input="visible => setComponent('showTitle', visible)" :checked="isVisible('showTitle')" label="chapters">{{ translations.components_show_title }}</el-checkbox>
              <el-checkbox class="block-checkbox" @input="visible => setComponent('episodeTitle', visible)" :checked="isVisible('episodeTitle')" label="chapters">{{ translations.components_episode_title }}</el-checkbox>
              <el-checkbox class="block-checkbox" @input="visible => setComponent('subtitle', visible)" :checked="isVisible('subtitle')" label="chapters">{{ translations.components_subtitle }}</el-checkbox>
              <el-checkbox class="block-checkbox" @input="visible => setComponent('progressbar', visible)" :checked="isVisible('progressbar')" label="progressbar">{{ translations.components_progressbar }}</el-checkbox>
            </el-form-item>
           </el-form>
        </el-col>
        <el-col :xs="24" :md="12">

          <h4>{{ translations.controls }}</h4>
            <el-form label-position="top" label-width="100px">
            <el-form-item>
              <el-checkbox class="block-checkbox" @input="visible => setComponent('controlSteppers', visible)" :checked="isVisible('controlSteppers')" label="steppers">Steppers</el-checkbox>
              <el-checkbox class="block-checkbox" @input="visible => setComponent('controlChapters', visible)" :checked="isVisible('controlChapters')" label="chapters">Chapters</el-checkbox>
            </el-form-item>
           </el-form>
        </el-col>
      </el-row>
    </div>

    <el-row :gutter="30">
      <el-col :span="24">
        <h3>{{ translations.preview }}</h3>
        <preview @ready="onReady" :config="playerConfig"></preview>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { head, capitalize } from 'lodash'
import { get } from 'lodash/fp'
import Preview from './Preview.vue'

export default {
  data () {
    return {
      playerReady: false,
      translations
    }
  },
  computed: {
    ...mapState('player/v4', {
      theme: get('theme'),
      tabs: get('tabs'),
      visibleComponents: get('visibleComponents')
    }),
    activeTab () {
      const activeTab = Object.keys(this.tabs).filter(tab => this.tabs[tab])
      return head(activeTab)
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
        visibleComponents: this.visibleComponents,
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
      this.$store.commit('player/v4/setMainColor', color)
      this.initPlayer(this.playerConfig)
    },
    setHighlightThemeColor (color) {
      this.$store.commit('player/v4/setHighlightColor', color)
      this.initPlayer(this.playerConfig)
    },
    setComponent (component, visible) {
      this.$store.commit('player/v4/setComponent', { component, visible })
      this.initPlayer(this.playerConfig)
    },
    setActiveTab (tab) {
      this.$store.commit('player/v4/setActiveTab', tab)
      this.initPlayer(this.playerConfig)
    },
    isVisible (component) {
      return this.visibleComponents.indexOf(component) !== -1
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
