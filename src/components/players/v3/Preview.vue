<template>
</template>

<script>
import { mapState } from 'vuex'
import { jQuery } from 'jquery'
import { get } from 'lodash'
import '@/../static/v3/js/podlove-web-moderator.min.js'

window.jQuery.fn.v3player = window.jQuery.fn.podlovewebplayer

export default {
  props: ['config'],
  methods: {
    render (config) {
      // Cleanup
      while (this.$el.firstChild) {
        this.$el.removeChild(this.$el.firstChild);
      }

      const audioNode = window.jQuery('<audio />')

      audioNode.attr('data-podlove-web-player-source', `static/v3/player.html?config=${encodeURIComponent(JSON.stringify(config))}`)

      this.$el.appendChild(audioNode.get(0))
      audioNode.v3player()
    }
  },
  mounted: function () {
    this.$emit('ready', this.render)
  }
}
</script>

