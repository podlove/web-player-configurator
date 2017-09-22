<template>
  <div></div>
</template>

<script>
import { mapState } from 'vuex'
import '@/../static/v4/embed.js'

export default {
  props: ['config'],
  mounted: function () {
    window.podlovePlayer(this.$el, this.config).then(store => {
      this.$emit('ready', store)
    })
  }
}
</script>
