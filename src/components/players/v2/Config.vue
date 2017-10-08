<template>
  <div class="player-config v2">
    <div class="config">
      <el-row>
        <el-col :span="24">
          <el-form label-position="top" label-width="100px">
             <el-form-item :label="translations.chapters">
                <el-checkbox @input="setChaptersVisible" :checked="playerConfig.chaptersVisible" label="info">{{ translations.chapters_on_load }}</el-checkbox>
             </el-form-item>
          </el-form>

          <h3>{{ translations.preview }}</h3>
          <preview :config="playerConfig" @ready="onReady"></preview>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash/fp'

import Preview from './Preview.vue'

export default {
  data () {
    return {
      translations
    }
  },
  computed: {
    playerConfig () {
      const meta = this.$store.state.player.meta
      const v2 = this.$store.state.player.v2

      return {
        ...v2,
        ...meta.episode,
        show: meta.show,
        files: meta.files,
        chapters: meta.chapters
      }
    }
  },
  methods: {
    onReady (renderPlayer) {
      this.renderPlayer = () => renderPlayer(this.playerConfig)
      this.renderPlayer()
    },
    setChaptersVisible (visible) {
      this.$store.commit('player/v2/setChaptersVisible', visible)
      this.renderPlayer()
    }
  },
  components: {
    Preview
  }
}
</script>
