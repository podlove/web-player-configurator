<template>
  <div class="player-config v2">
    <div class="config">
      <el-row>
        <el-col :span="24">
          <h3>Preview</h3>
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
  computed: {
    playerConfig () {
      const meta = this.$store.state.player.meta

      return {
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
    }
  },
  components: {
    Preview
  }
}
</script>
