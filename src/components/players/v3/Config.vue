<template>
  <div class="player-config v2">
    <div class="config">
      <el-row>
        <el-col :span="24">
          <el-form label-position="top" label-width="100px">
            <el-row>
              <el-col :span="12">
                <el-form-item label="Theme">
                  <el-select @input="setActiveTheme" :value="activeTheme" placeholder="Select">
                    <el-option v-for="(theme, index) in themes" :value="theme.id" :label="theme.name" v-bind:key="index"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
              <el-col :span="12">
                <el-form-item label="Chapters">
                  <el-checkbox @input="setChaptersVisible" :checked="playerConfig.chaptersVisible" label="info">Show Chapters On Load</el-checkbox>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>

          <h3>Preview</h3>
          <preview :config="playerConfig" @ready="onReady"></preview>
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
      const v3 = this.$store.state.player.v3

      return {
        ...v3,
        ...v3.params,
        ...meta.episode,
        show: meta.show,
        files: meta.files,
        chapters: meta.chapters
      }
    },
    activeTheme () {
      return this.$store.state.player.v3.activeTheme
    },
    themes () {
      return this.$store.state.player.v3.themes
    }
  },
  methods: {
    onReady (renderPlayer) {
      this.renderPlayer = () => renderPlayer(this.playerConfig)
      this.renderPlayer()
    },
    setChaptersVisible (visible) {
      this.$store.commit('player/v3/setChaptersVisible', visible)
      this.renderPlayer(this.playerConfig)
    },
    setActiveTheme (theme) {
      this.$store.commit('player/v3/setTheme', theme)
      this.renderPlayer(this.playerConfig)
    }
  },
  components: {
    Preview
  }
}
</script>
