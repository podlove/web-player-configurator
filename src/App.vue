<template>
  <div class="player-configurator">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style lang="scss">
  @import '~normalize.css';
  @import '~element-ui/lib/theme-default/index.css';
  @import 'styles/variables';
  @import 'styles/form';
  @import 'styles/fixes';

  html {
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  .player-configurator {
    height: 100%;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif;
    padding: $spacing;
  }
</style>
