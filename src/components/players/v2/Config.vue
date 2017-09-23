<template>
  <div class="player-config v2">
    <el-row>
      <el-col :span="24">
        <preview :config="playerConfig" @ready="onReady"></preview>
      </el-col>
    </el-row>

    <div class="config">
      <el-row :gutter="30">
        <el-col :xs="24">
          <el-form label-position="top" label-width="100px">
             <el-form-item>
                <el-checkbox @input="setChaptersVisible" :checked="playerConfig.chaptersVisible" label="info">Show Chapters On Load</el-checkbox>
             </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import Preview from './Preview.vue'

export default {
  computed: {
    playerConfig () {
      const meta = this.$store.state.player.meta
      const parameter = this.$store.state.player.v2

      return {
        ...parameter,
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
      this.$store.commit('setChaptersVisible', visible)
      this.renderPlayer()
    }
  },
  components: {
    Preview
  }
}
</script>
