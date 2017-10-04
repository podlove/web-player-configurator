<template></template>

<script>
import { mapState } from 'vuex'
import { jQuery } from 'jquery'
import '@/../static/podigee/podigee-podcast-player.js'

export default {
  props: ['config'],
    methods: {
    render (config) {
      // Cleanup
      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild);
      }

      window.podigeeConfig = this.config

      const embedScript = document.createElement('script')
      embedScript.setAttribute('class', 'podigee-podcast-player')
      embedScript.setAttribute('src', 'https://cdn.podigee.com/podcast-player/javascripts/podigee-podcast-player.js')
      embedScript.setAttribute('data-configuration', 'podigeeConfig')

      this.$el.appendChild(embedScript)
    }
  },
  mounted: function () {
    this.$emit('ready', this.render)
  }
}
</script>

<style lang="scss">
  .podigee-podcast-player {
    border: none;
    height: 500px;
    width: 100%;
  }
</style>
