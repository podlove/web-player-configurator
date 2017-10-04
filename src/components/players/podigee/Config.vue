<template>
  <div class="player-config v2">
    <div class="config">
      <el-row>
        <el-col :span="24">
          <preview :config="playerConfig" @ready="onReady"></preview>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { get } from 'lodash'

import Preview from './Preview.vue'

export default {
  computed: {
    playerConfig () {
      const meta = this.$store.state.player.meta
      const { title, poster, subtitle, summary } = meta.episode

      return {
        episode: {
          title,
          subtitle,
          description: summary,
          media: meta.files.reduce((result, file) => {
            const type = file.mimeType.split('/')

            result[type[1]] = file.url

            return result
          }, {}),
          coverUrl: poster,
          chaptermarks: meta.chapters
        }
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
