<template>
  <div class="preview">
    <audio>
      <source
        v-for="(file, index) in config.files"
        v-bind:key="index"
        :src="file.url"
        :type="file.mimeType"
      ></source>
    </audio>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { jQuery } from 'jquery'
import '@/../static/v2/podlove-web-player.js'

window.jQuery.fn.v2player = window.jQuery.fn.podlovewebplayer

export default {
  props: ['config'],
  methods: {
    render (config) {
      const audioNode = window.jQuery(this.$el).find('audio').clone()

      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild);
      }

      this.$el.appendChild(audioNode.get(0))
      audioNode.v2player(config)
    }
  },
  mounted: function () {
    this.$emit('ready', this.render)
  }
}
</script>

<style lang="scss" scoped>
  @import '~/static/v2/styles/podlove-web-player.css';
</style>

